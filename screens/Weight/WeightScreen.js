import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from "react-native";
import { WebBrowser } from "expo";
import {
  SaveWeight,
  GetWeightArray,
  ClearAllWeights
} from "../../utils/AsyncStorage";
import WeightDataList from "./WeightDataList";

export default class WeightScreen extends React.Component {
  static navigationOptions = {
    title: "Weight"
  };

  constructor() {
    super();
    this.state = {
      enteredText: "",
      numberOK: false,
      weightData: []
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleTextCheck = this.handleTextCheck.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleGetWeightsButton = this.handleGetWeightsButton.bind(this);
  }

  handleChangeText(value) {
    this.setState({ enteredText: value }, this.handleTextCheck);
  }

  handleTextCheck() { // TODO regex would be better & cleaner
    const indexOfDot1 = this.state.enteredText.indexOf(".");
    if (!this.state.enteredText.length || this.state.enteredText == 0) {
      this.setState({ numberOK: false });
      return;
    } else if (this.state.enteredText.includes("-")) {
      this.setState({ numberOK: false });
      return;
    } else if (indexOfDot1 !== -1) {
      const indexOfDot2 = this.state.enteredText.indexOf(".", indexOfDot1 + 1);
      if (indexOfDot2 !== -1) {
        this.setState({ numberOK: false });
        return;
      }
    }
    this.setState({ numberOK: true });
  }

  async handleSaveButton() {
    const time = new Date().getTime();
    const weight = parseFloat(this.state.enteredText);
    const success = await SaveWeight({ time, weight });
    this.setState({ enteredText: "", numberOK: false });
  }

  async handleGetWeightsButton() {
    const weightData = (await GetWeightArray()).reverse();
    this.setState({ weightData });
    // console.log(this.state.weightData)
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text>Hello from WeightScreen</Text>
          <TextInput
            onChangeText={this.handleChangeText}
            maxLength={5}
            keyboardType="decimal-pad"
            placeholder="Enter weight (kg)"
            value={this.state.enteredText}
            caretHidden={true}
          />
          <Text>{this.state.enteredText}</Text>
          <Button
            onPress={this.handleSaveButton}
            disabled={this.state.numberOK === true ? false : true}
            title="Save"
            color="#841584"
          />
          <Text>{this.state.numberOK}</Text>
          {/* FOR TESTING */}
          <Button title="Clear data" onPress={ClearAllWeights} />
          <Button title="Get Weights" onPress={this.handleGetWeightsButton} />
          {/* FOR TESTING */}
        </View>

        <WeightDataList weightData={this.state.weightData} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    // flexDirection: 'row',
    alignItems: "center"
  }
});
