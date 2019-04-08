import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { ExpoConfigView } from "@expo/samples";
import ExerciseDataList from "./ExerciseDataList";
import Colors from "../../constants/Colors";
import AddOrModifyExercise from "./AddOrModifyExercise";

export default class ExerciseScreen extends React.Component {
  static navigationOptions = {
    title: "Exercise"
  };

  constructor(props) {
    super(props);
    this.state = {showEditModal: false};
    this.closeEditModal = this.closeEditModal.bind(this);
  }
  // TODO next add AddOrModifyExercise component to this component, and workwork
  closeEditModal() {
    this.setState({showEditModal: false})
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
      <AddOrModifyExercise showEditModal={this.state.showEditModal} closeEditModal={this.closeEditModal}/>
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
            onPress={() => this.setState({showEditModal: true})}
          />
        </View>
        <ExerciseDataList/>
      </ScrollView>
      
    );
  }
}
