import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ChartView from "react-native-highcharts";
import { GetWeightArray } from "../../../utils/AsyncStorage";
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
    let storageData = (await GetWeightArray()).reverse();
    const now = new Date();
    if (this.state.filter_MS !== "all") {
      storageData = storageData.filter(
        x => now.getTime() - x.time <= this.state.filter_MS
      );
    }
    const weightData = storageData.map(weight => ({
      x: weight.time,
      y: weight.weight
    }));
    this.setState({ weightData: weightData });
  }

  getWeightChange() {
    if (!this.state.weightData.length) {
      return '';
    } else if (this.state.weightData.length === 1) {
      return '';
    } else {
      return this.state.weightData[0].y - this.state.weightData[this.state.weightData.length - 1].y + "kg";
    }
  }

  render() {
    const serie = this.state.weightData.length
      ? { name: "Your weight", data: this.state.weightData }
      : { name: "No data..", data: this.state.weightData };
    const showLegend = this.state.weightData.length ? false : true;
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
         <Icon name="md-time" type="Ionicons" />
          <Picker
            mode="dialog"
            iosIcon={<Icon name="arrow-down" />}
            style={{}}
            // placeholderStyle={{ color: "#bfc6ea" }}
            // placeholderIconColor="#007aff"
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
        <ChartView
          style={{ height: window.window.height / 2 }}
          config={conf}
          options={options}
        />
        <Card style={{ marginTop: 8 }}>
          <CardItem>
            {/* <Body> */}
            <Text>Timerange weight change</Text>
            <Badge style={{ backgroundColor: "lightgrey", marginLeft: 15 }}>
              <Text style={{ color: Colors.tintColor }}>
                {this.getWeightChange()}
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
