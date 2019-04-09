import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ChartView from "react-native-highcharts";
import { GetWeightArray, GetExerciseArray } from "../../../utils/AsyncStorage";
import window from "../../../constants/Layout";
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
  Toast
} from "native-base";

export default class ExerciseChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
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
    // const exerciseData = storageData.map(weight => ({
    //   x: weight.time,
    //   y: weight.weight
    // }));
    // this.setState({ exercises: weightData });
  }

  render() {
    const serie = this.state.exercises.length
      ? { name: "Your exercises", data: this.state.exercises }
      : { name: "No data yet", data: this.state.exercises };
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
        tickPixelInterval: 10,
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
        }
      },
      tooltip: {
        crosshairs: false,
        formatter: function() {
          return `${Highcharts.dateFormat(
            "%d.%m.%Y at %H:%M",
            this.x
          )}<br/> Weight:
            <b> ${Highcharts.numberFormat(this.y, 1)} kg </b>`;
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
            prompt="Choose timerange"
            // selectedValue={this.state.filter_MS}
            // onValueChange={filter_MS =>
            //   this.setState({ filter_MS }, () => this.chartData())
            // }
          >
            <Picker.Item label="2 weeks" value={1296000000} />
            <Picker.Item label="1 month" value={2592000000} />
            <Picker.Item label="3 months" value={7776000000} />
            <Picker.Item label="6 months" value={15552000000} />
            <Picker.Item label="All" value={"all"} />
          </Picker>
        </Item>
        <ChartView
          style={{ height: window.window.height / 2 }}
          config={conf}
          options={options}
        />
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
