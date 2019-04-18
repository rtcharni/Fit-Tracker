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

  calculateDurationProgressAndColors(totalDuration) {
    if (totalDuration < 1.005) {
      return {durationProgress: totalDuration, filled: Colors.tintColor, unfilled: Colors.unfilledBlue};
    } else if (totalDuration < 2.005) {
      return {durationProgress: totalDuration - 1, filled: Colors.filledGreen, unfilled: Colors.unfilledGreen};
    } else {
      return {durationProgress: totalDuration - 2, filled: Colors.filledRed, unfilled: Colors.unfilledRed};
    }
  }

  calculateCountProgressAndColors(totalCount) {
    if (totalCount < 1.005) {
      return {countProgress: totalCount, filled: Colors.tintColor, unfilled: Colors.unfilledBlue};
    } else if (totalCount < 2.005) {
      return {countProgress: totalCount - 1, filled: Colors.filledGreen, unfilled: Colors.unfilledGreen};
    } else {
      return {countProgress: totalCount - 2, filled: Colors.filledRed, unfilled: Colors.unfilledRed};
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

    const totalDurationProgress =
      this.state.exerciseDuration === 0
        ? 0
        : thisWeekExerciseDuration / this.state.exerciseDuration;
    const totalCountProgress =
      this.state.exerciseCount === 0
        ? 0
        : thisWeekExerciseCount / this.state.exerciseCount;

    
      const durationValues = this.calculateDurationProgressAndColors(totalDurationProgress);
      const countValues = this.calculateCountProgressAndColors(totalCountProgress);

    const getStrokeCapDuration = totalDurationProgress === 0 ? "butt" : "round";
    const getStrokeCapCount = totalCountProgress === 0 ? "butt" : "round";
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={() => this.handleWillFocus()} />
        <Text
          style={{
            marginTop: 5,
            marginBottom: 2,
            fontSize: 18,
            alignSelf: "center"
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
            progress={durationValues.durationProgress}
            color={durationValues.filled}
            unfilledColor={durationValues.unfilled}
            borderWidth={0}
            thickness={8}
            showsText={true}
            strokeCap={getStrokeCapDuration}
            formatText={progress =>
              Math.round(totalDurationProgress * 100) + "%"
            }
            // style={{ marginTop: 3.5, marginLeft: 10 }}
            useNativeDriver={true}
          />
          <ProgressCircle
            size={80}
            progress={countValues.countProgress}
            color={countValues.filled}
            unfilledColor={countValues.unfilled}
            borderWidth={0}
            thickness={8}
            showsText={true}
            strokeCap={getStrokeCapCount}
            formatText={progress =>
              Math.round(totalCountProgress * 100) + "%"
            }
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
