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

const TESTDATA = [
  { time: 1554649683901, exercise: "Swim", intensity: "medium", duration: 70 },
  { time: 1554641683901, exercise: "Running", intensity: "low", duration: 55 },
  { time: 1554635683901, exercise: "Football", intensity: "high", duration: 90 },
];

export default class ExerciseDataList extends Component {
  constructor(props) {
    super(props);
    this.state = { refresh: false };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  render() {
    return (
      <View style={{}}>
        <FlatList
          keyExtractor={(item, index) => item.time.toString()} //
          data={TESTDATA}
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
                  onPress={() => null}
                />
              }
            />
          )}
        />
      </View>
    );
  }
}
