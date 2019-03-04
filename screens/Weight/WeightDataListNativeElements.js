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
import { DeleteWeight, EditWeight } from "../../utils/AsyncStorage";
import window from "../../constants/Layout";

export default class WeightDataListNativeElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weightData: this.props.weightData,
      showEditWindow: false,
      editWeightValue: "",
      editIcon: { editWeightOK: false, success: false, error: true },
      chosenWeightItem: {},
      refresh: false
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleTextCheck = this.handleTextCheck.bind(this);
    this.updateWeight = this.updateWeight.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.weightData !== prevState.weightData) {
      return {
        weightData: nextProps.weightData
      };
    }
    return null;
  }

  onIconPress(item) {
    console.log(item);
    Alert.alert(
      "Item modification",
      "Do you want to modify this item?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => this.deleteItem(item),
          style: "destructive"
        },
        {
          text: "Edit",
          onPress: () => this.editItem(item),
          style: "default"
        }
      ],
      { cancelable: true }
    );
  }

  async deleteItem(item) {
    console.log("Delete Pressed");
    console.log(item);
    const response = await DeleteWeight(item);
    const index = this.state.weightData.findIndex(x => x.time == item.time);
    const tempData = this.state.weightData;
    tempData.splice(index, 1);
    this.setState({ weightData: tempData });
  }
  async editItem(item) {
    // Open other windows to edit!! weight value and/or date/time
    this.setState({ showEditWindow: true, chosenWeightItem: item });
  }

  handleChangeText(value) {
    this.setState({ editWeightValue: value }, this.handleTextCheck);
  }

  handleTextCheck() {
    // TODO regex would be better & cleaner
    const indexOfDot1 = this.state.editWeightValue.indexOf(".");
    if (!this.state.editWeightValue.length || this.state.editWeightValue == 0) {
      this.setState({
        editIcon: { editWeightOK: false, success: false, error: true }
      });
      return;
    } else if (this.state.editWeightValue.includes("-")) {
      this.setState({
        editIcon: { editWeightOK: false, success: false, error: true }
      });
      return;
    } else if (this.state.editWeightValue[0] == ".") {
      this.setState({
        editIcon: { editWeightOK: false, success: false, error: true }
      });
      return;
    } else if (indexOfDot1 !== -1) {
      const indexOfDot2 = this.state.editWeightValue.indexOf(
        ".",
        indexOfDot1 + 1
      );
      if (indexOfDot2 !== -1) {
        this.setState({
          editIcon: { editWeightOK: false, success: false, error: true }
        });
        return;
      }
    }
    this.setState({
      editIcon: { editWeightOK: true, success: true, error: false }
    });
  }

  getIconOkOrError() {
    if (this.state.editIcon.editWeightOK) {
      return "checkmark-circle";
    } else {
      return "close-circle";
    }
  }

  async updateWeight() {
    const weight = parseFloat(this.state.editWeightValue);
    const response = await EditWeight(this.state.chosenWeightItem, weight);

    const templist = this.state.weightData;
    const foundWeight = templist.find(
      weight => weight.time == this.state.chosenWeightItem.time
    );
    foundWeight.weight = weight;
    // console.log(foundWeight)
    // console.log(templist)
    // STATE UPDATES BUT LIST NOT!!???
    this.setState({
      showEditWindow: false,
      weightData: templist,
      refresh: !this.state.refresh,
      editWeightValue: "",
      editIcon: { editWeightOK: false, success: false, error: true }
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState !== this.state) {
  //     return true;
  //   }
  // }

  render() {
    return (
      <View>
        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showEditWindow}
          presentationStyle="pageSheet"
          onRequestClose={() => {
            return null;
          }}
        > */}
          
        {/* </Modal> */}
        <Overlay
          isVisible={this.state.showEditWindow}
          height={window.window.height - (window.window.height / 1.6)}
          onBackdropPress={() => this.setState({showEditWindow: false})}
          animationType="slide"
          transparent={true}
          borderRadius={12}
        >
          <Container>
            {/* <Header /> */}
            <Content padder>
              <Card>
                <CardItem header bordered>
                  <NativeBaseText>Enter correct value</NativeBaseText>
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
                        onPress={() => this.updateWeight()}
                      >
                        <NativeBaseText>Update</NativeBaseText>
                      </Button>
                      <Button
                        onPress={() =>
                          this.setState({
                            showEditWindow: false,
                            editWeightValue: "",
                            editIcon: { editWeightOK: false, success: false, error: true }
                          })
                        }
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

        <FlatList
          keyExtractor={(item, index) => item.time.toString()}
          data={this.state.weightData}
          extraData={this.state.refresh}
          renderItem={({ item }) => (
            <ListItem
              key={item.time}
              title={item.weight + "kg"}
              subtitle={`${new Date(item.time).toLocaleDateString()} - ${new Date(item.time).toLocaleTimeString().substr(0, 5)}`}
              bottomDivider={true}
              topDivider={true}
              pad={12}
              leftIcon={
                <NativeElementIcon
                  name="dot-single"
                  type="entypo"
                  color="grey"
                  size={24}
                />
              }
              rightIcon={
                <NativeElementIcon
                  raised
                  name="dots-three-vertical"
                  type="entypo"
                  color="green"
                  size={15}
                  onPress={() => this.onIconPress(item)}
                />
              }
            />
          )}
        />
      </View>
    );
  }
}
