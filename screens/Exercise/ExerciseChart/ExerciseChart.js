import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ChartView from "react-native-highcharts";
import { GetWeightArray, GetExerciseArray } from "../../../utils/AsyncStorage";
import window from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import { ConvertMinToDaysHoursMin } from "../../../utils/utils";
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
      filter: "all",
      filter_MS: 2592000000
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
    let storageData = await GetExerciseArray();
    const now = new Date();
    if (this.state.filter_MS !== "all") {
      storageData = storageData.filter(
        x => now.getTime() - x.time <= this.state.filter_MS
      );
    }
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

  getTotalDuration() {
    const totalMIN = this.state.exercises.reduce(
      (total, current) => total + current.y,
      0
    );
    return ConvertMinToDaysHoursMin(totalMIN);
  }

  getWordTimes() {
    if (this.state.exercises.length === 1) {
      return "time";
    }
    return "times";
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
          format: "{value}min"
        }
      },
      tooltip: {
        crosshairs: false,
        formatter: function() {
          const date = new Date(this.x);
          const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
          return `${date.getDate()}.${date.getMonth() +
            1}.${date.getFullYear()} at ${date.getHours()}:${minutes} <br/>Exercise: <b>${
            this.point.exercise
          }</b> <br/>  
            Duration:
              <b> ${this.y} min </b> <br/> Intensity: <b>${
            this.point.intensity
          }</b>`;

          // return `${Highcharts.dateFormat("%d.%m.%Y", this.x)}<br/>
          // Exercise: <b>${this.point.exercise}</b> <br/>
          // Duration:
          //   <b> ${Highcharts.numberFormat(
          //     this.y,
          //     0
          //   )} min </b> <br/> Intensity: <b>${this.point.intensity}</b>`;
        }
      },
      plotOptions: {
        series: {
          color: Colors.tintColor,
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
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Item
            picker
            style={{
              width: window.window.width / 2.2
              // alignContent: "center",
              // alignItems: "center",
              // alignSelf: "center",
              // flex: 0.5
            }}
          >
            <Icon name="filter" type="AntDesign" />
            <Picker
              mode="dialog"
              style={
                {
                  // marginLeft: -8,
                  // marginTop: 2,
                  // backgroundColor: "transparent"
                  // alignContent:"flex-end",
                  // alignItems: "flex-end",
                  // alignSelf:"flex-end",
                }
              }
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
            {/* <Icon name="filter" type="AntDesign" /> */}
          </Item>
          <Item
            picker
            style={{
              width: window.window.width / 2.2
              // alignContent: "center",
              // alignItems: "center",
              // alignSelf: "center",
              // flex: 0.5
            }}
          >
            <Icon name="md-time" type="Ionicons" />
            <Picker
              mode="dialog"
              style={
                {
                  // marginLeft: 0,
                  // marginTop: 0,
                  // backgroundColor: "transparent"
                }
              }
              prompt="Choose timerange"
              selectedValue={this.state.filter_MS}
              onValueChange={filter_MS =>
                this.setState({ filter_MS }, () => this.chartData())
              }
            >
              <Picker.Item label="1 week" value={604800000} />
              <Picker.Item label="2 weeks" value={1209600000} />
              <Picker.Item label="1 month" value={2592000000} />
              <Picker.Item label="3 months" value={7776000000} />
              <Picker.Item label="6 months" value={15552000000} />
              <Picker.Item label="All" value={"all"} />
            </Picker>
          </Item>
        </View>
        <ChartView
          style={{ height: window.window.height / 2 }}
          config={conf}
          options={options}
        />
        <Card style={{ marginTop: 8 }}>
          <CardItem>
            {/* <Body> */}
            <Text>Total duration</Text>
            <Badge style={{ backgroundColor: "lightgrey", marginLeft: 15 }}>
              <Text style={{ color: Colors.tintColor }}>
                {this.getTotalDuration()}
              </Text>
            </Badge>

            {/* </Body> */}
          </CardItem>
        </Card>
        <Card style={{ marginTop: 0 }}>
          <CardItem>
            {/* <Body> */}
            <Text>Total exercises</Text>
            <Badge style={{ backgroundColor: "lightgrey", marginLeft: 15 }}>
              <Text style={{ color: Colors.tintColor }}>
                {this.state.exercises.length} {this.getWordTimes()}
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
