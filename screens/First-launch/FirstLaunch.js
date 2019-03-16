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

export default class FirstLaunch extends React.Component {
  //   static navigationOptions = {
  //     title: "Some text"
  //   };

  constructor(props) {
    super(props);
    this.state = {
      startingWeight: "",
      targetWeight: "",
      height: "",
      gender: "male"
    };
  }

  async handleReadyButton() {
    const regexWeightCheck = /[1-9][0-9]{0,2}\.?[0-9]{0,2}/;
    const regexHeightCheck = /[1-9][0-9]{2}/;
    const startingWeightResult = this.state.startingWeight.match(
      regexWeightCheck
    );
    const targetWeightResult = this.state.targetWeight.match(regexWeightCheck);
    const heightResult = this.state.height.match(regexHeightCheck);
    if (
      startingWeightResult &&
      startingWeightResult[0] === startingWeightResult.input &&
      targetWeightResult &&
      targetWeightResult[0] === targetWeightResult.input &&
      heightResult &&
      heightResult[0] === heightResult.input
    ) {
      // Own showToast function with params...
      Toast.show({
        text: "Saved!",
        type: "success",
        position: "bottom",
        duration: 2000,
        textStyle: { fontSize: 20, textAlign: "center" }
      });
      FirstLaunchCompleted();
      SaveProfile({
        startingWeight: this.state.startingWeight,
        targetWeight: this.state.targetWeight,
        height: this.state.height,
        gender: this.state.gender
      });
      this.props.closeFirstLaunch();
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
                  <Text uppercase ellipsizeMod style={{ fontSize: 25 }}>
                    Welcome to Fit-Tracker!
                  </Text>
                  <Text note>and Thank You for downloading this app :)</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Form>
                <Text>
                  For tracking your results please fill out some information,
                  then you can see your progress
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
                    <Label>Height (cm)</Label>
                    <Input
                      value={this.state.height}
                      maxLength={3}
                      keyboardType="decimal-pad"
                      returnKeyType="done"
                      blurOnSubmit={true}
                      getRef={input => {
                        this.thirdInput = input;
                      }}
                      onChangeText={height => this.setState({ height })}
                    />
                    <Icon
                      name="arrow-expand-vertical"
                      type="MaterialCommunityIcons"
                    />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.gender}
                      onValueChange={gender => this.setState({ gender })}
                    >
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                      <Picker.Item label="Doesn't matter" value="unknown" />
                    </Picker>
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
              <Text>Ready to start</Text>
              <Icon name="arrow-forward" />
            </Button>
            <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
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
