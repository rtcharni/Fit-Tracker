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
  Button
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { DeleteWeight, EditWeight, SaveWeight } from "../../utils/AsyncStorage";
import window from "../../constants/Layout";

export default class AddOrModifyWeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: this.props.showEnterWeightComponent,
      editWeightValue: "",
      editIcon: { editWeightOK: false, success: false, error: true },
      chosenWeightItem: null
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleTextCheck = this.handleTextCheck.bind(this);
    this.saveWeight = this.saveWeight.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if (nextProps.showEnterWeightComponent !== prevState.showComponent) {
      return { showComponent: nextProps.showEnterWeightComponent };
    }
    return null;
  }

  handleChangeText(value) {
    this.setState({ editWeightValue: value }, this.handleTextCheck);
  }

  handleTextCheck() {
    const regexWeightCheck = /[1-9][0-9]{0,2}\.?[0-9]{0,2}/;
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
    if (this.state.editIcon.editWeightOK) {
      return "checkmark-circle";
    } else {
      return "close-circle";
    }
  }

  async saveWeight() {
    const weight = parseFloat(this.state.editWeightValue);
    if (this.props.chosenWeightItem) {
      const response = await EditWeight(this.props.chosenWeightItem, weight);
      // null chosenWeight
    } else {
      const time = new Date().getTime();
      const response = await SaveWeight({ time, weight });
    }
    this.setState({
      editWeightValue: "",
      chosenWeightItem: null,
      editIcon: { editWeightOK: false, success: false, error: true },
    });
    this.props.updateListNewOrModified(weight, this.props.chosenWeightItem);
  }

  render() {
    return (
      <Overlay
        isVisible={this.state.showComponent}
        height={window.window.height - window.window.height / 1.6}
        onBackdropPress={() => this.setState({ showComponent: false })}
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
                  {this.state.chosenWeightItem
                    ? "Enter new weight"
                    : "Enter weight"}
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
                      onPress={() => this.saveWeight()}
                    >
                      <NativeBaseText>
                        {this.props.chosenWeightItem ? "Update" : "Save"}
                      </NativeBaseText>
                    </Button>
                    <Button
                      onPress={() => {
                        this.setState({
                          // showComponent: false,
                          editWeightValue: "",
                          chosenWeightItem: null,
                          editIcon: {
                            editWeightOK: false,
                            success: false,
                            error: true
                          }
                        });
                        this.props.closeEnterWeightWindow();
                      }}
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