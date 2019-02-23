import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";

export default class WeightScreen extends React.Component {
  static navigationOptions = {
    title: "Weight"
  };

  render() {
    return (
            <View>
                <Text>Hello from WeightScreen</Text>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },

});
