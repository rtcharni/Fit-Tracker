import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ChartView from "react-native-highcharts";
import { GetWeightArray } from "../../../utils/AsyncStorage";
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

// TODO FILTER BY TIME!
export default class WeightChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightData: [],
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
    const storageData = (await GetWeightArray()).reverse();
    const now = new Date();
    const filtered = storageData.filter(x => (now.getTime() - x.time) <= this.state.filter_MS);
    const weightData = filtered.map(weight => ({
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
    return (
      <Container>
        <Item picker underline style={{ alignSelf: "center", width: window.window.width / 2}}>
        <Icon name="filter" type="AntDesign" />
          <Picker
            mode="dialog"
            iosIcon={<Icon name="arrow-down" />}
            style={{  }}
            // placeholderStyle={{ color: "#bfc6ea" }}
            // placeholderIconColor="#007aff"
            prompt="Choose timerange"
            selectedValue={this.state.filter_MS}
            onValueChange={filter_MS => this.setState({ filter_MS }, () => this.chartData())}
          >
            <Picker.Item label="2 weeks" value={1296000000} />
            <Picker.Item label="1 month" value={2592000000} />
            <Picker.Item label="3 months" value={7776000000} />
            <Picker.Item label="6 months" value={15552000000} />

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
