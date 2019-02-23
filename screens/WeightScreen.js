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

export default class WeightScreen extends React.Component {
  static navigationOptions = {
    title: 'Weight'
  };

  constructor() {
    super();
    this.state = {
      enteredText: '',
      numberOK: false,
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleTextCheck = this.handleTextCheck.bind(this);
    this.handleOnSaveButton = this.handleOnSaveButton.bind(this);
  }

  handleChangeText(value) {
    this.setState({ enteredText: value }, this.handleTextCheck);
  }

  handleTextCheck() {
    const indexOfDot1 = this.state.enteredText.indexOf('.');
    if (!this.state.enteredText.length) {
      this.setState({numberOK: false});
      return;
    } else if (indexOfDot1 !== -1) {
      const indexOfDot2 = this.state.enteredText.indexOf('.', indexOfDot1 + 1);
      if (indexOfDot2 !== -1) {
        this.setState({numberOK: false})
        return;
      }
    }
    this.setState({numberOK: true})
  }

  handleOnSaveButton() {
    const now = new Date().getTime();
    const weight = parseFloat(this.state.enteredText);
    console.log(weight);
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from WeightScreen</Text>
        <TextInput
          onChangeText={this.handleChangeText}
          maxLength={5}
          keyboardType="decimal-pad"
          placeholder="Enter weight (kg) ..."
        />
        <Text>{this.state.enteredText}</Text>
        <Button
          onPress={this.handleOnSaveButton}
          disabled={this.state.numberOK === true ? false : true}
          title="Save"
          color="#841584"
        />
        <Text>{this.state.numberOK}</Text>
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
