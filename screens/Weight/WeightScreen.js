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
import WeightDataListNativeElements from "./WeightDataListNativeElements";
import AddOrModifyWeight from "./AddOrModifyWeight";

export default class WeightScreen extends React.Component {
  static navigationOptions = {
    title: "Weight"
  };

  constructor() {
    super();
    this.state = {
      weightData: [],
      showEnterWeightComponent: false
    };
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.getAllWeights = this.getAllWeights.bind(this);
    this.closeEnterWeightWindow = this.closeEnterWeightWindow.bind(this);
    this.updateListNewOrModified = this.updateListNewOrModified.bind(this);
  }

  componentDidMount() {
    this.getAllWeights();
  }

  async handleSaveButton() {
    this.setState({ showEnterWeightComponent: true });
  }

  async getAllWeights() {
    const weightData = (await GetWeightArray()).reverse();
    this.setState({ weightData });
  }

  updateListNewOrModified(newWeight, editChosenWeight = null) {
    const weight = parseFloat(newWeight);
    const templist = this.state.weightData;
    if (editChosenWeight) {
      const foundWeight = templist.find(
        weight => weight.time == editChosenWeight.time
      );
      foundWeight.weight = weight;
    } else {
      console.log("IM IN ELSE OK!!!");
      const time = new Date().getTime();
      templist.unshift({ time, weight });
    }

    this.setState({
      weightData: templist,
      showEnterWeightComponent: false
    });
  }

  closeEnterWeightWindow() {
    this.setState({ showEnterWeightComponent: false });
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <AddOrModifyWeight
            showEnterWeightComponent={this.state.showEnterWeightComponent}
            closeEnterWeightWindow={this.closeEnterWeightWindow}
            updateListNewOrModified={this.updateListNewOrModified}
            chosenWeightItem={this.state.chosenWeightItem}
          />
          <Button
            onPress={this.handleSaveButton}
            title="Save value"
            color="#841584"
          />
          {/* FOR TESTING */}
          <Button title="Clear data" onPress={ClearAllWeights} />
          <Button title="Get Weights" onPress={this.getAllWeights} />
          {/* FOR TESTING */}
        </View>

        <WeightDataListNativeElements weightData={this.state.weightData} />
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
