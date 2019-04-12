import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ChartView from "react-native-highcharts";
import { GetWeightArray, GetExerciseArray } from "../../../utils/AsyncStorage";
import window from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Picker,
  Button,
  Toast,
  Badge
} from "native-base";

export default class ExerciseChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      filter: "all"
    };
    this.chartData = this.chartData.bind(this);
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.refresh !== prevState.refresh) {
  //     return { refresh: nextProps.refresh };
  //   }
  //   return null;
  // }

  componentDidMount() {
    this.chartData();
  }

  async chartData() {
    const storageData = await GetExerciseArray();
    let exerciseData = storageData.map(exercise => ({
      x: exercise.time,
      y: exercise.duration,
      intensity: exercise.intensity,
      exercise: exercise.exercise
    }));
    switch (this.state.filter) {
      case "all":
        break;
      case "low":
        exerciseData = exerciseData.filter(x => x.intensity === "low");
        break;
      case "medium":
        exerciseData = exerciseData.filter(x => x.intensity === "medium");
        break;
      case "high":
        exerciseData = exerciseData.filter(x => x.intensity === "high");
        break;
      default:
        break;
    }
    this.setState({ exercises: exerciseData });
  }

  render() {
    const serie = this.state.exercises.length
      ? { name: "Your exercises", data: this.state.exercises }
      : { name: "No data..", data: this.state.exercises };
    const showLegend = this.state.exercises.length ? false : true;
    const Highcharts = "Highcharts";
    const conf = {
      chart: {
        type: "spline", // spline / line
        animation: Highcharts.svg // don't animate in old IE
      },
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 30,
        labels: {
          formatter: function() {
            const date = new Date(this.value);
            return `${date.getDate()}.${date.getMonth() + 1}`;
          }
        }
      },
      yAxis: {
        title: {
          text: ""
        },
        labels: {
          format: "{value} min"
        }
      },
      tooltip: {
        crosshairs: false,
        formatter: function() {
          return `${Highcharts.dateFormat("%d.%m.%Y", this.x)}<br/>
          Exercise: <b>${this.point.exercise}</b> <br/>  
          Duration:
            <b> ${Highcharts.numberFormat(
              this.y,
              0
            )} min </b> <br/> Intensity: <b>${this.point.intensity}</b>`;
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: "{point.exercise}"
          }
        }
      },
      legend: {
        enabled: showLegend
      },
      exporting: {
        enabled: false
      },
      series: [serie]
    };
    // console.log(conf);
    const options = {
      global: {
        useUTC: false
      }
    };
    return (
      <Container>
        <Item
          picker
          underline
          style={{ alignSelf: "flex-end", width: window.window.width / 2 }}
        >
          <Icon name="filter" type="AntDesign" />
          <Picker
            mode="dialog"
            iosIcon={<Icon name="arrow-down" />}
            style={{}}
            // placeholderStyle={{ color: "#bfc6ea" }}
            // placeholderIconColor="#007aff"
            prompt="Show only with intensity"
            selectedValue={this.state.filter}
            onValueChange={filter =>
              this.setState({ filter }, () => this.chartData())
            }
          >
            <Picker.Item label="All" value={"all"} />
            <Picker.Item label="Low" value={"low"} />
            <Picker.Item label="Medium" value={"medium"} />
            <Picker.Item label="High" value={"high"} />
          </Picker>
        </Item>
        <ChartView
          style={{ height: window.window.height / 2 }}
          config={conf}
          options={options}
        />
        <Card style={{marginTop:8}}>
          <CardItem>
            {/* <Body> */}
            <Text>Total duration</Text>
            <Badge style={{ backgroundColor: "lightgrey", marginLeft: 15 }}>
              <Text style={{ color: Colors.tintColor }}>
                {this.state.exercises.reduce(
                  (total, current) => total + current.y,
                  0
                )}{" "}
                min
              </Text>
            </Badge>

            {/* </Body> */}
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            {/* <Body> */}
            <Text>Total exercises</Text>
            <Badge style={{ backgroundColor: "lightgrey", marginLeft: 15 }}>
              <Text style={{ color: Colors.tintColor }}>
                {this.state.exercises.length}
              </Text>
            </Badge>

            {/* </Body> */}
          </CardItem>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
