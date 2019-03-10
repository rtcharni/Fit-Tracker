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
  Picker
} from "native-base";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  constructor() {
    super();
    this.state = {
      pickerValue: "male"
    };
  }

  handlePickerChange(item, index) {
    console.log(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <Container>
          <Header />
          <Content padder>
            <Form>
              <Card>
                <CardItem header bordered>
                  <Text>Your profile</Text>
                </CardItem>
                <CardItem>
                  <Item floatingLabel>
                    <Icon active name="home" />
                    <Label>Starting weight</Label>
                    <Input />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item floatingLabel>
                    <Icon active name="home" />
                    <Label>Target weight</Label>
                    <Input />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item floatingLabel>
                    <Label>Height</Label>
                    <Input />
                    <Icon active name="swap" />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="Select your SIM"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.pickerValue}
                      onValueChange={this.handlePickerChange.bind(this)}
                    >
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                      <Picker.Item label="Doesn't matter" value="unknown" />
                    </Picker>
                  </Item>
                </CardItem>

                <CardItem footer bordered>
                  <Text>Footer if needed</Text>
                </CardItem>
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
