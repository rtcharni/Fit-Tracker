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
import Colors from "../../constants/Colors";
import { DeleteExercise } from "../../utils/AsyncStorage";

const TESTDATA = [
  { time: 1554649683901, exercise: "Swim", intensity: "medium", duration: 70 },
  { time: 1554641683901, exercise: "Running", intensity: "low", duration: 55 },
  { time: 1554635683901, exercise: "Football", intensity: "high", duration: 90 },
];

export default class ExerciseDataList extends Component {
  constructor(props) {
    super(props);
    this.state = { refresh: false, exercises: this.props.exercises };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.exercises !== prevState.exercises) {
      return {exercises: nextProps.exercises}
    }
    return null;
  }

  handleDotOptionsIconPress(item) {
    Alert.alert(
      `Date: ${new Date(item.time).toLocaleDateString()}. Exercise: ${item.exercise}`,
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

  async editItem(item) {
    
  }

  async deleteItem(item) {
    const response = await DeleteExercise(item);
    Toast.show({
      text: "Exercise deleted!",
      type: "warning",
      position: "bottom",
      duration: 2000
    });
    this.props.getAllExercises();
  }

  render() {
    return (
      <View style={{}}>
        <FlatList
          keyExtractor={(item, index) => item.time.toString()} //
          data={this.state.exercises}
          extraData={this.state.refresh}
          ListHeaderComponent={() => (
            <ListItem
              title={"Exercises"}
              bottomDivider={true}
              topDivider={true}
              leftIcon={
                <NativeElementIcon
                  name="run"
                  type="material-community"
                  color="grey"
                  size={24}
                />
              }
            />
          )}
          renderItem={({ item }) => (
            <ListItem
              key={item.time}
              title={item.exercise}
              subtitle={`${new Date(item.time).toLocaleDateString()} - ${
                item.intensity
              }`}
              bottomDivider={true}
              topDivider={true}
              pad={12}
              badge={{
                value: `${item.duration}min`,
                textStyle: { color: Colors.tintColor, fontSize: 17 },
                badgeStyle: { backgroundColor: "lightgrey", padding: 12 },
                containerStyle: {}
              }}
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
