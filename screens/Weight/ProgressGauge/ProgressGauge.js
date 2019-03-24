import React, { Component } from "react";
import { Constants, Svg } from "expo";
import { View, StyleSheet, Text } from "react-native";
import {
  AnimatedGaugeProgress,
  GaugeProgress
} from "react-native-simple-gauge";
import window from "../../../constants/Layout";
import { GetProfile } from "../../../utils/AsyncStorage";
import Colors from "../../../constants/Colors";
import { withNavigationFocus, NavigationEvents } from "react-navigation";

const size = 180;
const width = 10;
const cropDegree = 180;
const textOffset = width;
const textWidth = size - textOffset * 2;
const textHeight = size * (1 - cropDegree / 360) - textOffset * 2;

class ProgressGauge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastWeight: null,
      profile: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.lastWeight !== prevState.lastWeight) {
      return {
        lastWeight: nextProps.lastWeight
      };
    }
    return null;
  }

  async handleWillFocus() {
    const profile = await GetProfile();
    this.setState({ profile: profile });
  }

  render() {
    let percentage = 0;
    try {
      if (this.state.profile && this.state.lastWeight) {
        const actualLost =
          this.state.profile.startingWeight - this.props.lastWeight.weight;
        const targetLost =
          this.state.profile.startingWeight - this.state.profile.targetWeight;
        percentage = parseFloat(((actualLost / targetLost) * 100).toFixed(0));
        if (!isFinite(percentage)) {
          percentage = 0;
        }
      }
    } catch (error) {
      percentage = 0;
    }
    return (
      <View>
        <NavigationEvents
          onWillFocus={() => this.handleWillFocus()}
        />
        <AnimatedGaugeProgress
          style={{ alignItems: "center", marginBottom: -100, marginTop: 15 }}
          size={size}
          width={width}
          fill={percentage} // This is percentage of progress rotation={90}
          cropDegree={cropDegree}
          tintColor={Colors.tintColor}
          delay={0}
          backgroundColor="#b0c4de"
          stroke={[1, 1]} //For a equaly dashed line
          strokeCap="circle"
        >
          <View style={styles.textView}>
            <Text style={styles.text}>{percentage}% Done</Text>
          </View>
        </AnimatedGaugeProgress>
      </View>
    );
  }
}

export default withNavigationFocus(ProgressGauge);

const styles = StyleSheet.create({
  textView: {
    position: "absolute",
    top: textOffset,
    // left: textOffset,
    width: textWidth,
    height: textHeight,
    alignItems: "center",
    justifyContent: "center"
    // alignContent: "center"
  },
  text: {
    fontSize: 17,
    fontWeight: "400"
  }
});
