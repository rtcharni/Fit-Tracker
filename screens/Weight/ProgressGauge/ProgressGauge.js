import React, { Component } from "react";
import { Constants, Svg } from "expo";
import { View, StyleSheet, Text } from "react-native";
import {
  AnimatedGaugeProgress,
  GaugeProgress
} from "react-native-simple-gauge";
import window from "../../../constants/Layout";

const size = 180;
const width = 10;
const cropDegree = 180;
const textOffset = width;
const textWidth = size - textOffset * 2;
const textHeight = size * (1 - cropDegree / 360) - textOffset * 2;

export default class ProgressGauge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressPercent: 50
    };
  }

  render() {
    return (
      <AnimatedGaugeProgress
        style={{ alignItems: "center", marginBottom: -120, marginTop:10 }}
        size={size}
        width={width}
        fill={this.state.progressPercent} // This is percentage of progress rotation={90}
        cropDegree={cropDegree}
        tintColor="#4682b4"
        delay={0}
        backgroundColor="#b0c4de"
        stroke={[1, 1]} //For a equaly dashed line
        strokeCap="circle"
      >
        <View style={styles.textView}>
          <Text style={styles.text}>{this.state.progressPercent}% Done</Text>
        </View>
      </AnimatedGaugeProgress>
    );
  }
}

const styles = StyleSheet.create({
  textView: {
    position: "absolute",
    top: textOffset,
    // left: textOffset,
    width: textWidth,
    height: textHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 14
  }
});
