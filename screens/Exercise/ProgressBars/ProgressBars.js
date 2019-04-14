import React, { Component } from "react";
import { Constants, Svg } from "expo";
import { View, StyleSheet, Text } from "react-native";
import window from "../../../constants/Layout";
import { GetProfile } from "../../../utils/AsyncStorage";
import Colors from "../../../constants/Colors";
import { NavigationEvents } from "react-navigation";
import { ConvertDateToMonday } from "../../../utils/utils";
import ProgressBar from "react-native-progress/Bar";
// import * as Progress from 'react-native-progress-fixed';
import ProgressCircle from "react-native-progress/Circle";

export default class ProgressBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      exerciseDuration: null,
      exerciseCount: null,
      monday: null,
      durationProgress: 0,
      countProgress: 0.2
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.exercises !== prevState.exercises) {
      return {
        exercises: nextProps.exercises
      };
    }
    return null;
  }

  async handleWillFocus() {
    const now = new Date();
    const monday = ConvertDateToMonday(now);
    const profile = await GetProfile();
    this.setState({
      exerciseDuration: profile.exerciseDuration,
      exerciseCount: profile.exerciseCount,
      monday: monday
    });
  }

  componentDidMount() {
    this.getProgress();
  }

  getProgress() {
    setInterval(() => {
      if (this.state.durationProgress === 1) {
        this.setState({ durationProgress: 0 });
      }
      this.setState({ durationProgress: this.state.durationProgress + 0.1 });
    }, 1000);
  }

  render() {
    {
      /* <NavigationEvents
      onWillFocus={() => this.handleWillFocus()}
    /> */
    }
    try {
    } catch (error) {
      percentage = 0;
    }
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            marginTop: 5,
            marginBottom: 5,
            fontSize: 18,
            alignSelf: "center",
            fontStyle: "italic"
          }}
        >
          Week goals
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Text style={{ marginRight: 0 }}>Duration</Text>
          <Text style={{ marginRight: 0 }}>Count</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <ProgressCircle
            size={80}
            progress={this.state.durationProgress}
            color={Colors.tintColor}
            unfilledColor={"#b0c4de"}
            borderWidth={0}
            thickness={8}
            showsText={true}
            strokeCap="butt"
            // formatText={}
            // style={{ marginTop: 3.5, marginLeft: 10 }}
            useNativeDriver={true}
          />
          <ProgressCircle
            size={80}
            progress={this.state.durationProgress}
            color={Colors.tintColor}
            unfilledColor={"#b0c4de"}
            borderWidth={0}
            thickness={8}
            showsText={true}
            strokeCap="butt"
            // formatText={}
            // style={{ marginTop: 3.5, marginLeft: 10 }}
            useNativeDriver={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: "400"
  }
});

{
  /* <Text
          style={{
            marginTop: 8,
            marginBottom: 5,
            fontSize: 18,
            alignSelf: "center",
            fontStyle: "italic"
          }}
        >
          Goals
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{}}>Duration</Text>

          <ProgressBar
            progress={this.state.durationProgress}
            color={Colors.tintColor}
            unfilledColor={"#b0c4de"}
            borderWidth={0}
            style={{ marginTop: 3.5, marginLeft: 10 }}
            //   borderColor={}
            width={window.window.width / 1.5}
            height={15}
            borderRadius={15}
            useNativeDriver={true}
            animationConfig={{ bounciness: 0 }}
          />
          <Text>{this.state.durationProgress * 100}%</Text>
        </View>

        <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
          <Text style={{}}>Count</Text>

          <ProgressBar
            progress={this.state.countProgress}
            color={Colors.tintColor}
            unfilledColor={"#b0c4de"}
            borderWidth={0}
            style={{ marginTop: 3.5, marginLeft: 10 }}
            //   borderColor={}
            width={window.window.width / 1.5}
            height={15}
            borderRadius={15}
            useNativeDriver={true}
            animationConfig={{ bounciness: 0 }}
          />
          <Text>{this.state.countProgress * 100}%</Text>
        </View>

        <Text>100%</Text> */
}
