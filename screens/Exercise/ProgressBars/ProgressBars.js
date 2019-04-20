import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import window from "../../../constants/Layout";
import { GetProfile } from "../../../utils/AsyncStorage";
import Colors from "../../../constants/Colors";
import { NavigationEvents } from "react-navigation";
import { ConvertDateToMonday } from "../../../utils/utils";
import ProgressCircle from "react-native-progress/Circle";

export default class ProgressBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      exerciseDuration: 0,
      exerciseCount: 0
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
    const profile = await GetProfile();
    // console.log(profile);
    if (!profile.exerciseDuration || !profile.exerciseCount) {
      this.props.navigation.replace("Profile", {
        message: "New features available! Please update goals",
        goBack: true
      });
    } else {
      this.setState({
        exerciseDuration: profile.exerciseDuration,
        exerciseCount: profile.exerciseCount
      });
    }
  }

  render() {
    const monday = ConvertDateToMonday(new Date());
    const thisWeekExerciseDuration = this.state.exercises
      .filter(x => new Date(x.time) >= monday)
      .reduce((total, current) => total + current.duration, 0);
    const thisWeekExerciseCount = this.state.exercises.filter(
      x => new Date(x.time) >= monday
    ).length;

    const durationProgress =
      this.state.exerciseDuration === 0
        ? 0
        : thisWeekExerciseDuration / this.state.exerciseDuration;
    const countProgress =
      this.state.exerciseCount === 0
        ? 0
        : thisWeekExerciseCount / this.state.exerciseCount;

    const getStrokeCapDuration = durationProgress === 0 ? "butt" : "round";
    const getStrokeCapCount = countProgress === 0 ? "butt" : "round";
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={() => this.handleWillFocus()} />
        <Text
          style={{
            marginTop: 5,
            marginBottom: 2,
            fontSize: 18,
            alignSelf: "center",
          }}
        >
          Week goals
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Text style={{ right: window.window.width / 6.4 }}>Duration</Text>
          <Text style={{ left: window.window.width / 8 }}>Count</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <ProgressCircle
            size={80}
            progress={durationProgress}
            color={Colors.tintColor}
            unfilledColor={"#b0c4de"}
            borderWidth={0}
            thickness={8}
            showsText={true}
            strokeCap={getStrokeCapDuration}
            // formatText={}
            // style={{ marginTop: 3.5, marginLeft: 10 }}
            useNativeDriver={true}
          />
          <ProgressCircle
            size={80}
            progress={countProgress}
            color={Colors.tintColor}
            unfilledColor={"#b0c4de"}
            borderWidth={0}
            thickness={8}
            showsText={true}
            strokeCap={getStrokeCapCount}
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
