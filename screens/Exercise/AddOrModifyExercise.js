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
import window from "../../constants/Layout";

export default class AddOrModifyWeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showComponent: true,
        editIcon: { editExerciseOK: false, success: false, error: true }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  handleChangeText(value) {
    // this.setState({ editWeightValue: value }, this.handleTextCheck);
  }

  handleTextCheck() {
    const regexWeightCheck = /[1-9][0-9]{0,2}[,.]?[0-9]{0,2}/;
    const textCheckResult = this.state.editWeightValue.match(regexWeightCheck);
    if (textCheckResult && textCheckResult[0] === textCheckResult.input) {
      this.setState({
        editIcon: { editWeightOK: true, success: true, error: false }
      });
    } else {
      this.setState({
        editIcon: { editWeightOK: false, success: false, error: true }
      });
    }
  }

  getIconOkOrError() {
    if (this.state.editIcon.editExerciseOK) {
      return "checkmark-circle";
    } else {
      return "close-circle";
    }
  }

//   resetComponent() {
//     this.setState({
//       editWeightValue: "",
//       chosenWeightItem: null,
//       editIcon: {
//         editWeightOK: false,
//         success: false,
//         error: true
//       }
//     });
//   }

  render() {
    return (
      <Overlay
        isVisible={this.state.showComponent}
        height={window.window.height - window.window.height / 1.6}
        onBackdropPress={() => {
        //   this.resetComponent();
        //   this.props.closeEnterWeightWindow();
        }}
        animationType="slide"
        transparent={true}
        borderRadius={12}
      >
        <Container>
          {/* <Header /> */}
          <Content padder>
            <Card>
              <CardItem header bordered>
                <NativeBaseText>
                  {/* {this.state.chosenWeightItem
                    ? "Enter new weight"
                    : "Enter weight"} */}
                </NativeBaseText>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Item
                    error={this.state.editIcon.error}
                    success={this.state.editIcon.success}
                  >
                    <Input
                      placeholder="Weight..."
                      onChangeText={this.handleChangeText}
                      maxLength={5}
                      keyboardType="decimal-pad"
                    />
                    <NativeBaseIcon name={this.getIconOkOrError()} />
                  </Item>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignSelf: "center",
                      marginTop: 12
                    }}
                  >
                    <Button
                      style={{ marginRight: 20 }}
                      rounded
                      disabled={this.state.editIcon.error}
                      onPress={() => null}
                    >
                      <NativeBaseText>
                        {this.props.chosenExerciseItem ? "Update" : "Save"}
                      </NativeBaseText>
                    </Button>
                    <Button
                    //   onPress={() => {
                    //     this.resetComponent();
                    //     this.props.closeEnterWeightWindow();
                    //   }}
                      rounded
                      bordered
                      dark
                    >
                      <NativeBaseText>Cancel</NativeBaseText>
                    </Button>
                  </View>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </Overlay>
    );
  }
}
