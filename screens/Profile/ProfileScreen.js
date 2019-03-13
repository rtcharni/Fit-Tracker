import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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
  Toast
} from "native-base";
import {
  GetProfile,
  SaveProfile,
  ClearProfile
} from "../../utils/AsyncStorage";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  constructor(props) {
    super(props);
    this.state = {
      gender: "male",
      startingWeight: "",
      targetWeight: "",
      height: ""
    };
  }

  async componentDidMount() {
    const profile = await GetProfile();
    if (profile) {
      this.setState({
        gender: profile.gender,
        startingWeight: profile.startingWeight,
        targetWeight: profile.targetWeight,
        height: profile.height
      });
    }
  }

  async handleSaveButton() {
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
      await SaveProfile({
        startingWeight: this.state.startingWeight,
        targetWeight: this.state.targetWeight,
        gender: this.state.gender,
        height: this.state.height
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

  render() {
    return (
      <View style={styles.container}>
        <Container>
          {/* <Header /> */}
          <Content padder>
            <Form>
              <Card>
                <CardItem header bordered>
                  <Text>Your profile</Text>
                </CardItem>
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
                    <Icon name="weight-kilogram" type="MaterialCommunityIcons" />
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
                    <Icon name="arrow-expand-vertical" type="MaterialCommunityIcons" />

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

                {/* <CardItem footer bordered>
                  <Text>Footer if needed</Text>
                </CardItem> */}
                <Button block iconLeft onPress={() => this.handleSaveButton()}>
                  <Text>Save</Text>
                  <Icon name="save" />
                </Button>
                <Text>Save</Text>
                <Button block large iconRight>
                  <Text>Save</Text>
                  <Icon name="save" />
                </Button>
                <Text>Save</Text>
                <Button
                  block
                  small
                  iconLeft
                  onPress={async () => await ClearProfile()}
                >
                  <Text>Clear profile</Text>
                </Button>
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
