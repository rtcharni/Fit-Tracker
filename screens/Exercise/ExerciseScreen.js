import React from "react";
import { Text, View } from "react-native";
import { ExpoConfigView } from "@expo/samples";

export default class ExerciseScreen extends React.Component {
  static navigationOptions = {
    title: "Exercise"
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 26 }}>Will be in next release!</Text>
      </View>
    );
  }
}
