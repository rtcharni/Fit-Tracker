import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
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
  Thumbnail,
  Left,
  Right
} from "native-base";
import window from "../../constants/Layout";
import { FirstLaunchCompleted, SaveProfile } from "../../utils/AsyncStorage";
import Colors from "../../constants/Colors";
import { ConvertCommaToDot } from "../../utils/utils";

export default class FirstLaunch extends React.Component {
  static navigationOptions = {
    title: "First launch"
  };

  constructor(props) {
    super(props);
    this.state = {
      startingWeight: "",
      targetWeight: "",
      exerciseDuration: "",
      exerciseCount: ""
    };
  }

  async handleReadyButton() {
    const regexWeightCheck = /[1-9][0-9]{0,2}[,.]?[0-9]{0,2}/;
    const regexExerciseDurationCheck = /[1-9][0-9]{0,3}/;
    const regexExerciseCountCheck = /[1-9][0-9]{0,1}/;
    const startingWeightResult = this.state.startingWeight.match(
      regexWeightCheck
    );
    const targetWeightResult = this.state.targetWeight.match(regexWeightCheck);
    const exerciseDurationResult = this.state.exerciseDuration.match(
      regexExerciseDurationCheck
    );
    const exerciseCountResult = this.state.exerciseCount.match(
      regexExerciseCountCheck
    );
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
      FirstLaunchCompleted();
      const startingWithoutComma = ConvertCommaToDot(this.state.startingWeight);
      const targetWithoutComma = ConvertCommaToDot(this.state.targetWeight);
      SaveProfile({
        startingWeight: startingWithoutComma,
        targetWeight: targetWithoutComma,
        exerciseDuration: this.state.exerciseDuration,
        exerciseCount: this.state.exerciseCount
      });
      this.props.navigation.replace("Weight", {showWalkthrough: true});
      // this.props.closeFirstLaunch();
      // this.props.navigation.navigate("Weightchart")
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

  render() {
    return (
      <Container>
        <Content>
          <Card style={{}}>
            <CardItem>
              <Left>
                <Thumbnail
                  large
                  source={require("../../assets/images/apple.png")}
                />
                <Body>
                  <Text
                    uppercase
                    ellipsizeMod
                    style={{ fontSize: 25, color: Colors.tintColor }}
                  >
                    Welcome to Fit-Tracker!
                  </Text>
                  <Text note>lose weight, get fit, be healthy</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Form>
                <Text>
                  For tracking your results and getting best user experience,
                  please fill out some information.
                </Text>
                <CardItem>
                  <Item floatingLabel>
                    <Label>Starting weight (kg)</Label>
                    <Input
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
                  <Item floatingLabel>
                    <Label>Target weight (kg)</Label>
                    <Input
                      value={this.state.targetWeight}
                      maxLength={5}
                      keyboardType="decimal-pad"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      getRef={input => {
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
                  <Item floatingLabel>
                    <Label>Week goal exercise amount (min)</Label>
                    <Input
                      // placeholder="Week goal exercise amount (min)"
                      value={this.state.exerciseDuration}
                      maxLength={4}
                      keyboardType="decimal-pad"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      getRef={input => {
                        this.thirdInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.fourthInput._root.focus();
                      }}
                      onChangeText={exerciseDuration =>
                        this.setState({ exerciseDuration })
                      }
                    />
                    <Icon name="timelapse" type="MaterialIcons" />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item floatingLabel>
                  <Label>Week goal exercise quantity</Label>
                    <Input
                      // placeholder="Week goal exercise count"
                      value={this.state.exerciseCount}
                      maxLength={2}
                      keyboardType="decimal-pad"
                      returnKeyType="done"
                      blurOnSubmit={true}
                      getRef={input => {
                        this.fourthInput = input;
                      }}
                      onChangeText={exerciseCount =>
                        this.setState({ exerciseCount })
                      }
                    />
                    <Icon name="counter" type="MaterialCommunityIcons" />
                  </Item>
                </CardItem>
              </Form>
            </CardItem>
            <Button
              iconRight
              light
              rounded
              block
              style={{ alignSelf: "center" }}
              onPress={() => this.handleReadyButton()}
            >
              <Text style={{ color: Colors.tintColor }}>Ready</Text>
              <Icon name="arrow-forward" />
            </Button>
          </Card>
        </Content>
      </Container>
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
