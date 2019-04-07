import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { ExpoConfigView } from "@expo/samples";
import ExerciseDataList from "./ExerciseDataList";
import Colors from "../../constants/Colors";

export default class ExerciseScreen extends React.Component {
  static navigationOptions = {
    title: "Exercise"
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <ScrollView style={{ flex: 1 }}>
      <View
          style={{
            flex: 1,
            flexDirection: "row",
            // alignSelf: "auto",
            marginTop: 1,
            // alignContent: "space-around",
            justifyContent: "space-between"
          }}
        >
          <Icon
            raised
            name="chart-line"
            type="material-community"
            color={Colors.tintColor}
            size={24}
            iconStyle={{}}
            containerStyle={{}}
            onPress={() => null}
          />
          <Icon
            reverse
            name="add-circle-outline"
            type="MaterialIcons"
            color={Colors.tintColor}
            size={24}
            iconStyle={{}}
            containerStyle={{}} // alignSelf: "flex-end"
            onPress={() => null}
          />
        </View>
        <ExerciseDataList/>
      </ScrollView>
      
    );
  }
}
