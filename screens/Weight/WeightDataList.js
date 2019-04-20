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
import { DeleteWeight, EditWeight } from "../../utils/AsyncStorage";
import AddOrModifyWeight from "./AddOrModifyWeight";
import Colors from "../../constants/Colors";

export default class WeightDataList extends Component {
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

  handleDotOptionsIconPress(item) {
    Alert.alert(
      `Date: ${new Date(item.time).toLocaleDateString()}. Weight: ${item.weight}kg`,
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
    const response = await DeleteWeight(item);
    // const index = this.state.weightData.findIndex(x => x.time == item.time);
    // const tempData = this.state.weightData;
    // tempData.splice(index, 1);
    // this.setState({ weightData: tempData });
    Toast.show({
      text: "Item deleted!",
      type: "warning",
      position: "bottom",
      duration: 2000
    });
    this.props.getAllWeights();
  }

  async editItem(item) {
    this.setState({ showEnterWeightComponent: true, chosenWeightItem: item });
  }

  handleChangeText(value) {
    this.setState({ editWeightValue: value }, this.handleTextCheck);
  }

  handleTextCheck() {
    const regexWeightCheck = /[1-9][0-9]{0,2}[,.]?[0-9]{0,2}/;
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
        getAllWeights={this.props.getAllWeights}
          closeEnterWeightWindow={this.closeEnterWeightWindow}
          showEnterWeightComponent={this.state.showEnterWeightComponent}
          updateListNewOrModified={this.updateListNewOrModified}
          chosenWeightItem={this.state.chosenWeightItem}
        />
        <FlatList
          keyExtractor={(item, index) => item.time.toString()} //
          data={this.state.weightData}
          extraData={this.state.refresh}
          ListHeaderComponent={() => <ListItem
            title={"Entries"}
            bottomDivider={true}
            topDivider={true}
            titleStyle={{fontFamily: 'Roboto'}}
            leftIcon={
              <NativeElementIcon
                name="weight-kilogram"
                type="material-community"
                color="grey"
                size={24}
              />
            }
          />}
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
              titleStyle={{fontFamily: 'Roboto'}}
              subtitleStyle={{fontFamily: 'Roboto'}}
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
                  // raised
                  name="dots-three-vertical"
                  type="entypo"
                  color={Colors.tintColor}
                  size={15}
                  onPress={() => this.handleDotOptionsIconPress(item)}
                />
              }
            />
          )}
        />
      </View>
    );
  }
}
