import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ChartView from "react-native-highcharts";

export default class WeightChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  // TODO
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showEnterWeightComponent !== prevState.showComponent) {
      return { showComponent: nextProps.showEnterWeightComponent };
    }
    return null;
  }
  
  render() {
    const Highcharts = "Highcharts";
    const conf = {
      chart: {
        type: "spline",
        animation: Highcharts.svg // don't animate in old IE
        // marginRight: 10,
        // events: { }
      },
      title: {
        text: "Progress"
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: "datetime"
      },
      yAxis: {
        title: {
          text: "Weight"
        }
        // labels: {
        //     formatter: function () {
        //         return this.value + '°';
        //     }
        // }
        // plotLines: [
        //   {
        //     value: 0,
        //     width: 1,
        //     color: "#808080"
        //   }
        // ]
      },
      tooltip: {
        crosshairs: true
        // formatter: function() {
        //   return (
        //     "<b>" +
        //     this.series.name +
        //     "</b><br/>" +
        //     Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x) +
        //     "<br/>" +
        //     Highcharts.numberFormat(this.y, 2)
        //   );
        // }
      },
      legend: {
        enabled: false
      },
      //   exporting: {
      //     enabled: false
      //   },
      series: [
        {
          name: "Random data",
          data: [{ x: 1552156058188, y: 10 }, { x: 1552156158188, y: 12 }]
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
