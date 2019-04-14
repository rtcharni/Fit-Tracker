import React, { Component } from "react";
import {
  ListItem,
  Icon as NativeElementsIcon,
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
  Toast,
  Picker
} from "native-base";
import window from "../../constants/Layout";
import { SaveExercise, EditExercise } from "../../utils/AsyncStorage";

export default class AddOrModifyExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: this.props.showEditModal,
      editIcon: { editExerciseOK: false, success: false, error: true },
      exercise: "",
      duration: "",
      intensity: "medium"
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showEditModal !== prevState.showEditModal) {
      return {
        showEditModal: nextProps.showEditModal
      };
    }
    return null;
  }

  handleChangeText(textValue, target) {
    if (target == "exercise")
      this.setState({ exercise: textValue }, this.handleTextCheck);
    if (target == "duration")
      this.setState({ duration: textValue }, this.handleTextCheck);
    // this.setState({ editWeightValue: value }, this.handleTextCheck);
  }

  handleTextCheck() {
    const regexDuration = /[1-9][0-9]{0,2}/;
    const durationCheckResult = this.state.duration.match(regexDuration);
    if (
      durationCheckResult &&
      durationCheckResult[0] === durationCheckResult.input
    ) {
      this.setState({
        editIcon: { editExerciseOK: true, success: true, error: false }
      });
    } else {
      this.setState({
        editIcon: { editExerciseOK: false, success: false, error: true }
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

  async handleSave() {
    if (this.props.chosenExercise) {
      const newExercise = {
        exercise: this.state.exercise,
        duration: parseInt(this.state.duration, 10),
        intensity: this.state.intensity
      };
      const editedExercise = Object.assign(this.props.chosenExercise, newExercise);
      await EditExercise(editedExercise);
      this.props.closeEditModal();
      this.props.getAllExercises();
    } else {
      const exerciseObject = {
        time: Date.now(),
        exercise: this.state.exercise,
        duration: parseInt(this.state.duration, 10),
        intensity: this.state.intensity
      };
      const response = await SaveExercise(exerciseObject);
      const toastType = response === true ? "success" : "danger";
      const toastText =
        response === true ? "Exercise saved!" : "Couldn't save exercise :/";
      Toast.show({
        text: toastText,
        type: toastType,
        position: "bottom",
        duration: 2000
      });
      this.resetComponent();
      this.props.closeEditModal();
      this.props.getAllExercises();
    }
  }

  resetComponent() {
    this.setState({
      exercise: "",
      duration: "",
      intensity: "medium",
      // chosenWeightItem: null,
      editIcon: { editExerciseOK: false, success: false, error: true }
    });
  }

  render() {
    return (
      <Overlay
        isVisible={this.state.showEditModal}
        height={window.window.height - window.window.height / 2.3} // 2.1
        onBackdropPress={() => {
          this.resetComponent();
          this.props.closeEditModal();
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
                  {this.props.chosenExercise
                    ? "Edit exercise"
                    : "Enter new exercise"}
                </NativeBaseText>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Item
                  // error={this.state.editIcon.error}
                  // success={this.state.editIcon.success}
                  >
                    <Input
                      autoFocus
                      ref={c => (this.exerciseInput = c)}
                      placeholder="Exercise name..."
                      onChange={e =>
                        this.handleChangeText(e.nativeEvent.text, "exercise")
                      }
                      maxLength={30}
                      keyboardType="default"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        // console.log(this.secondInput);
                        this.durationInput._root.focus();
                      }}
                    />
                  </Item>
                  <Item
                    error={this.state.editIcon.error}
                    success={this.state.editIcon.success}
                  >
                    <Input
                      ref={c => (this.durationInput = c)}
                      placeholder="Duration (min)..."
                      nativeID="durationField"
                      onChange={e =>
                        this.handleChangeText(e.nativeEvent.text, "duration")
                      }
                      maxLength={3}
                      keyboardType="decimal-pad"
                      returnKeyType="done"
                    />
                    <NativeBaseIcon name={this.getIconOkOrError()} />
                  </Item>
                  <Item picker>
                    <Picker
                      ref={c => (this.intensityInput = c)}
                      mode="dropdown"
                      iosIcon={<NativeBaseIcon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.intensity}
                      onValueChange={intensity => this.setState({ intensity })}
                    >
                      <Picker.Item label="Low" value="low" />
                      <Picker.Item label="Medium" value="medium" />
                      <Picker.Item label="High" value="high" />
                    </Picker>
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
                      onPress={async () => {
                        await this.handleSave();
                      }}
                    >
                      <NativeBaseText>
                        {this.props.chosenExerciseItem ? "Update" : "Save"}
                      </NativeBaseText>
                    </Button>
                    <Button
                      onPress={() => {
                        this.resetComponent();
                        this.props.closeEditModal();
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
