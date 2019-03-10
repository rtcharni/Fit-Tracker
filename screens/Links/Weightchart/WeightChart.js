import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ChartView from "react-native-highcharts";
import { GetWeightArray } from "../../../utils/AsyncStorage";

// TODO FILTER BY TIME!
export default class WeightChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightData: [],
      refresh: this.props.refresh
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
    const storageData = (await GetWeightArray()).reverse();
    const weightData = storageData.map(weight => ({x: weight.time, y: weight.weight}));
    this.setState({weightData: weightData});
  }

  render() {
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
        tickPixelInterval: 10
      },
      yAxis: {
        title: {
          text: ""
        }
      },
      tooltip: {
        crosshairs: false,
        formatter: function() {
          return (
            `${Highcharts.dateFormat("%d.%m.%Y at %H:%M", this.x)}<br/> Weight:
            <b> ${Highcharts.numberFormat(this.y, 1)} kg </b>`
          );
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [
        {
          name: "Your weight",
          data: this.state.weightData
          // data: [
          //   { x: 1551678840363, y: 60 },
          //   { x: 1551851640363, y: 59.5 },
          //   { x: 1551938040363, y: 58 },
          //   { x: 1552024440363, y: 58.8 },
          //   { x: 1552110840363, y: 58.2 }
          // ]
        }
      ]
    };

    const options = {
      global: {
        useUTC: false
      },
      lang: {
        decimalPoint: ",",
        thousandsSep: "."
      }
    };

    return (
      <ChartView style={{ height: 300 }} config={conf} options={options} />
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
