import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { ExpoConfigView } from "@expo/samples";
import ExerciseDataList from "./ExerciseDataList";
import Colors from "../../constants/Colors";
import AddOrModifyExercise from "./AddOrModifyExercise";
import { GetExerciseArray } from "../../utils/AsyncStorage";
import ProgressBars from "./ProgressBars/ProgressBars";

export default class ExerciseScreen extends React.Component {
  static navigationOptions = {
    title: "Exercise"
  };

  constructor(props) {
    super(props);
    this.state = { showEditModal: false, exercises: [] };
    this.closeEditModal = this.closeEditModal.bind(this);
    this.getAllExercises = this.getAllExercises.bind(this);
  }

  componentDidMount() {
    this.getAllExercises();
  }
  
  closeEditModal() {
    this.setState({ showEditModal: false });
  }

  async getAllExercises() {
    const allExercises = await GetExerciseArray();
    this.setState({ exercises: allExercises });
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1 }}>
        <ProgressBars exercises={this.state.exercises} navigation={this.props.navigation}/>
        <AddOrModifyExercise
          showEditModal={this.state.showEditModal}
          closeEditModal={this.closeEditModal}
          getAllExercises={this.getAllExercises}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
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
            onPress={() => this.props.navigation.navigate("ExerciseChart")}
          />
          <Icon
            reverse
            name="add-circle-outline"
            type="MaterialIcons"
            color={Colors.tintColor}
            size={24}
            iconStyle={{}}
            containerStyle={{}} // alignSelf: "flex-end"
            onPress={() => this.setState({ showEditModal: true })}
          />
        </View>
        <ExerciseDataList
          closeEditModal={this.closeEditModal}
          exercises={this.state.exercises}
          getAllExercises={this.getAllExercises}
        />
      </ScrollView>
    );
  }
}
