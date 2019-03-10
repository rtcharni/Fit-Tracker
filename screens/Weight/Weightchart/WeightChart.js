import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ChartView from "react-native-highcharts";
import { GetWeightArray } from "../../../utils/AsyncStorage";
import window from "../../../constants/Layout";

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
    const weightData = storageData.map(weight => ({
      x: weight.time,
      y: weight.weight
    }));
    this.setState({ weightData: weightData });
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
        tickPixelInterval: 10,
        labels: {
          formatter: function() {
            const date = new Date(this.value);
            return `${date.getDate()}.${date.getMonth() + 1}`
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
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [
        {
          name: "Your weight",
          data: this.state.weightData
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
        // shortMonths: ["Tam", "Hel", "3", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Lok", "Mar", "Jou"]
      }
    };
    const deviceHeight = window.window.height;
    return (
      <ChartView
        style={{ height: window.window.height / 2 }}
        config={conf}
        options={options}
      />
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
