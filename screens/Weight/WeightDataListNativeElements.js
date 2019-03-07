import React, { Component } from "react";
import {
  ListItem,
  Icon as NativeElementIcon,
  Overlay,
  Text as NativeElementsText
} from "react-native-elements";
import { FlatList, View, Alert, Modal, TouchableHighlight } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text as NativeBaseText,
  Body,
  Input,
  Icon as NativeBaseIcon,
  Item,
  Button,
  Toast
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { DeleteWeight, EditWeight } from "../../utils/AsyncStorage";
import window from "../../constants/Layout";
import AddOrModifyWeight from "./AddOrModifyWeight";

export default class WeightDataListNativeElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weightData: this.props.weightData,
      showEnterWeightComponent: false,
      editWeightValue: "",
      editIcon: { editWeightOK: false, success: false, error: true },
      chosenWeightItem: null,
      refresh: false
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleTextCheck = this.handleTextCheck.bind(this);
    this.editItem = this.editItem.bind(this);
    this.updateListNewOrModified = this.updateListNewOrModified.bind(this);
    this.closeEnterWeightWindow = this.closeEnterWeightWindow.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.weightData !== prevState.weightData) {
      return {
        weightData: nextProps.weightData
      };
    }
    return null;
  }

  onIconPress(item) {
    console.log(item);
    Alert.alert(
      "Item modification",
      "Do you want to modify this item?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => this.deleteItem(item),
          style: "destructive"
        },
        {
          text: "Edit",
          onPress: () => this.editItem(item),
          style: "default"
        }
      ],
      { cancelable: true }
    );
  }

  async deleteItem(item) {
    console.log("Delete Pressed");
    console.log(item);
    const response = await DeleteWeight(item);
    const index = this.state.weightData.findIndex(x => x.time == item.time);
    const tempData = this.state.weightData;
    tempData.splice(index, 1);
    this.setState({ weightData: tempData });
    Toast.show({
      text: "Item deleted!",
      type: "success",
      position: "bottom",
      duration: 2000
    });
  }

  async editItem(item) {
    this.setState({ showEnterWeightComponent: true, chosenWeightItem: item });
  }

  handleChangeText(value) {
    this.setState({ editWeightValue: value }, this.handleTextCheck);
  }

  handleTextCheck() {
    const regexWeightCheck = /[1-9][0-9]{0,2}\.?[0-9]{0,2}/;
    const textCheckResult = this.state.enteredText.match(regexWeightCheck);
    if (textCheckResult && textCheckResult[0] === textCheckResult.input) {
      this.setState({
        editIcon: { editWeightOK: true, success: true, error: false }
      });
    } else {
      this.setState({
        editIcon: { editWeightOK: false, success: false, error: true }
      });
    }
  }

  getIconOkOrError() {
    if (this.state.editIcon.editWeightOK) {
      return "checkmark-circle";
    } else {
      return "close-circle";
    }
  }

  // REFACTOR!! now in two places....
  updateListNewOrModified(newWeight, editChosenWeight) {
    const weight = parseFloat(newWeight);
    const templist = this.state.weightData;
    if (editChosenWeight) {
      const foundWeight = templist.find(
        weight => weight.time == editChosenWeight.time
      );
      foundWeight.weight = weight;
    } else {
      const time = new Date().getTime();
      templist.unshift({ time, weight });
    }
    this.setState({
      weightData: templist,
      refresh: !this.state.refresh,
      showEnterWeightComponent: false,
      chosenWeightItem: null
    });
  }

  closeEnterWeightWindow() {
    this.setState({ showEnterWeightComponent: false });
  }

  render() {
    return (
      <View style={{}}>
        <AddOrModifyWeight
          closeEnterWeightWindow={this.closeEnterWeightWindow}
          showEnterWeightComponent={this.state.showEnterWeightComponent}
          updateListNewOrModified={this.updateListNewOrModified}
          chosenWeightItem={this.state.chosenWeightItem}
        />
        <FlatList
          keyExtractor={(item, index) => item.time.toString()} //
          data={this.state.weightData}
          extraData={this.state.refresh}
          renderItem={({ item }) => (
            <ListItem
              key={item.time}
              title={item.weight + "kg"}
              subtitle={`${new Date(
                item.time
              ).toLocaleDateString()} - ${new Date(item.time)
                .toLocaleTimeString()
                .substr(0, 5)}`}
              bottomDivider={true}
              topDivider={true}
              pad={12}
              leftIcon={
                <NativeElementIcon
                  name="dot-single"
                  type="entypo"
                  color="grey"
                  size={24}
                />
              }
              rightIcon={
                <NativeElementIcon
                  raised
                  name="dots-three-vertical"
                  type="entypo"
                  color="green"
                  size={15}
                  onPress={() => this.onIconPress(item)}
                />
              }
            />
          )}
        />
      </View>
    );
  }
}
