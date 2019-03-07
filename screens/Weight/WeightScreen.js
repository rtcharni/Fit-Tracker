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
import {
  Container,
  Button as NativeBaseButton,
  Icon,
  Fab,
  View as NativeBaseView
} from "native-base";
import { WebBrowser } from "expo";
import {
  SaveWeight,
  GetWeightArray,
  ClearAllWeights
} from "../../utils/AsyncStorage";
import window from "../../constants/Layout";
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
      showEnterWeightComponent: false,
      fabActive: true
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

    this.setState(
      {
        weightData: templist,
        showEnterWeightComponent: false
      },
      this.getAllWeights
    );
  }

  closeEnterWeightWindow() {
    this.setState({ showEnterWeightComponent: false });
  }

  lol() {
    console.log('JEEEEE')
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

        {/* NOT WORKING ON PRESS!?  */}
        <Container>
          <NativeBaseView style={{ flex: 1 }}>
            <Fab
              active={false}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: "#5067FF" }}
              position="bottomRight"
              onPress={() => this.lol()}
            >
              <Icon name="add" />
            </Fab>
          </NativeBaseView>
        </Container>

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
  // fab: {
  //   marginBottom: (window.window.height - window.window.height / 3.9)
  // }
});
