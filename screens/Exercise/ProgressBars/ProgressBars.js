import React, { Component } from "react";
import { Constants, Svg } from "expo";
import { View, StyleSheet, Text, ProgressBarAndroid } from "react-native";
import {
  AnimatedGaugeProgress,
  GaugeProgress
} from "react-native-simple-gauge";
import window from "../../../constants/Layout";
import { GetProfile } from "../../../utils/AsyncStorage";
import Colors from "../../../constants/Colors";
import { NavigationEvents } from "react-navigation";
import { ConvertDateToMonday } from "../../../utils/utils";

export default class ProgressBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      exerciseDuration: null,
      exerciseCount: null,
      monday: null
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

  render() {
    try {
    } catch (error) {
      percentage = 0;
    }
    return (
      <View>
        {/* <NavigationEvents
          onWillFocus={() => this.handleWillFocus()}
        /> */}
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />
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
