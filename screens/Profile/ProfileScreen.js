import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Icon as NativeElementsIcon } from "react-native-elements";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Picker,
  Button,
  Toast,
  ActionSheet
} from "native-base";
import tintColor from "../../constants/Colors";
import {
  GetProfile,
  SaveProfile,
  ClearProfile,
  ClearAllWeights
} from "../../utils/AsyncStorage";
import { ConvertCommaToDot } from '../../utils/utils'
import Colors from "../../constants/Colors";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  constructor(props) {
    super(props);
    this.state = {
      // gender: "male",
      startingWeight: "",
      targetWeight: "",
      exerciseDuration: "",
      exerciseCount: ""
    };
  }

  async componentDidMount() {
    const profile = await GetProfile();
    if (profile) {
      this.setState({
        // gender: profile.gender,
        startingWeight: profile.startingWeight,
        targetWeight: profile.targetWeight,
        exerciseDuration: profile.exerciseDuration,
        exerciseCount: profile.exerciseCount
      });
    }
  }

  async handleSaveButton() {
    const regexWeightCheck = /[1-9][0-9]{0,2}[,.]?[0-9]{0,2}/;
    const regexExerciseDurationCheck = /[1-9][0-9]{0,3}/;
    const regexExerciseCountCheck = /[1-9][0-9]{0,1}/;
    const startingWeightResult = this.state.startingWeight.match(
      regexWeightCheck
    );
    const targetWeightResult = this.state.targetWeight.match(regexWeightCheck);
    const exerciseDurationResult = this.state.exerciseDuration.match(regexExerciseDurationCheck);
    const exerciseCountResult = this.state.exerciseCount.match(regexExerciseCountCheck);
    if (
      startingWeightResult &&
      startingWeightResult[0] === startingWeightResult.input &&
      targetWeightResult &&
      targetWeightResult[0] === targetWeightResult.input &&
      exerciseDurationResult &&
      exerciseDurationResult[0] === exerciseDurationResult.input &&
      exerciseCountResult &&
      exerciseCountResult[0] === exerciseCountResult.input
    ) {
      // Own showToast function with params...
      Toast.show({
        text: "Saved!",
        type: "success",
        position: "bottom",
        duration: 2000,
        textStyle: { fontSize: 20, textAlign: "center" }
      });
      const startingWithoutComma = ConvertCommaToDot(this.state.startingWeight);
      const targetWithoutComma = ConvertCommaToDot(this.state.targetWeight);
      await SaveProfile({
        startingWeight: startingWithoutComma,
        targetWeight: targetWithoutComma,
        exerciseDuration: this.state.exerciseDuration,
        exerciseCount: this.state.exerciseCount
      });
    } else {
      Toast.show({
        text: "Please correct values..",
        // type: "danger",
        position: "bottom",
        duration: 2000,
        textStyle: { fontSize: 20, textAlign: "center" }
      });
    }
  }

  showDeleteActionSheet() {
    const buttons = [
      "Delete all entered weights",
      "Delete whole profile and weight",
      "Cancel"
    ];
    ActionSheet.show(
      {
        options: buttons,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
        title: "Want to start over?"
      },
      async index => {
        if (index === 0) {
          await ClearAllWeights();
        } else if (index === 1) {
          await ClearProfile();
          await ClearAllWeights();
        }
      }
    );
  }

  showUpdateActionSheet() {
    const buttons = ["Yes!", "Cancel"];
    ActionSheet.show(
      {
        options: buttons,
        cancelButtonIndex: 1,
        title: "Update profile?"
      },
      async index => {
        if (index === 0) {
          await this.handleSaveButton();
        }
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Container>
          {/* <Header /> */}
          <Content padder>
            <Form>
              <Card>
                <CardItem header bordered>
                  <Text style={{ color: Colors.tintColor }}>
                    Here you can update your info
                  </Text>
                </CardItem>
                <CardItem>
                  <Item>
                    {/* <Label>Starting weight (kg)</Label> */}
                    <Input
                      placeholder="Starting weight (kg)"
                      value={this.state.startingWeight}
                      maxLength={5}
                      keyboardType="decimal-pad"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        this.secondInput._root.focus();
                      }}
                      onChangeText={startingWeight =>
                        this.setState({ startingWeight })
                      }
                    />
                    <Icon
                      name="weight-kilogram"
                      type="MaterialCommunityIcons"
                    />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item>
                    {/* <Label>Target weight (kg)</Label> */}
                    <Input
                      placeholder="Target weight (kg)"
                      value={this.state.targetWeight}
                      maxLength={5}
                      keyboardType="decimal-pad"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      ref={input => {
                        this.secondInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.thirdInput._root.focus();
                      }}
                      onChangeText={targetWeight =>
                        this.setState({ targetWeight })
                      }
                    />
                    <Icon name="target-two" type="Foundation" />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item>
                    {/* <Label>Height (cm)</Label> */}
                    <Input
                      placeholder="Week goal exercise amount (min)"
                      value={this.state.exerciseDuration}
                      maxLength={4}
                      keyboardType="decimal-pad"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      ref={input => {
                        this.thirdInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.fourthInput._root.focus();
                      }}
                      onChangeText={exerciseDuration => this.setState({ exerciseDuration })}
                    />
                    <Icon
                      name="arrow-expand-vertical"
                      type="MaterialCommunityIcons"
                    />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item>
                    {/* <Label>Height (cm)</Label> */}
                    <Input
                      placeholder="Week goal exercise count"
                      value={this.state.exerciseCount}
                      maxLength={2}
                      keyboardType="decimal-pad"
                      returnKeyType="done"
                      blurOnSubmit={true}
                      ref={input => {
                        this.fourthInput = input;
                      }}
                      onChangeText={exerciseCount => this.setState({ exerciseCount })}
                    />
                    <Icon
                      name="arrow-expand-vertical"
                      type="MaterialCommunityIcons"
                    />
                  </Item>
                </CardItem>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    // alignSelf: "auto",
                    // marginTop: 1,
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "space-evenly",
                    marginBottom: 25,
                    marginTop: 15
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: tintColor.tintColor,
                      width: "70%"
                    }}
                    block
                    iconRight
                    onPress={() => this.showUpdateActionSheet()}
                  >
                    <Text>Update</Text>
                    <Icon name="save" />
                  </Button>
                  <NativeElementsIcon
                    // reverse
                    // raised
                    name="delete-sweep"
                    type="material-community"
                    color={"black"}
                    size={45}
                    iconStyle={{}}
                    containerStyle={{}}
                    onPress={() => this.showDeleteActionSheet()}
                  />
                </View>
              </Card>
            </Form>
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
