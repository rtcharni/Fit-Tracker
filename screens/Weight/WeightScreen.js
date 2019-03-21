import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Icon } from "react-native-elements";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from "react-native";
import {
  Container,
  Button as NativeBaseButton,
  Fab,
  View as NativeBaseView
} from "native-base";
import { WebBrowser } from "expo";
import {
  SaveWeight,
  GetWeightArray,
  ClearAllWeights,
  GetFirstLaunch
} from "../../utils/AsyncStorage";
import window from "../../constants/Layout";
import tintColor from '../../constants/Colors';
import WeightDataListNativeElements from "./WeightDataListNativeElements";
import AddOrModifyWeight from "./AddOrModifyWeight";
import ProgressGauge from "./ProgressGauge/ProgressGauge";
import FirstLaunch from "../First-launch/FirstLaunch";

export default class WeightScreen extends React.Component {
  static navigationOptions = {
    title: 'Weight'
  };

  constructor(props) {
    super(props);
    this.state = {
      weightData: [],
      showEnterWeightComponent: false,
      firstLaunch: false
    };
    this.getAllWeights = this.getAllWeights.bind(this);
    this.closeEnterWeightWindow = this.closeEnterWeightWindow.bind(this);
    this.updateListNewOrModified = this.updateListNewOrModified.bind(this);
    this.closeFirstLaunch = this.closeFirstLaunch.bind(this);
  }

  async componentDidMount() {
    const result = await GetFirstLaunch();
    if (!result) {
      this.setState({ firstLaunch: true });
    } else {
      this.getAllWeights();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.firstLaunch) {
      this.getAllWeights();
    }
  }

  async getAllWeights() {
    const weightData = (await GetWeightArray()).reverse();
    this.setState({ weightData });
    // this.forceUpdate();
  }

  updateListNewOrModified(newWeight, editChosenWeight = null) {
    // const weight = parseFloat(newWeight);
    // const templist = this.state.weightData;
    // if (editChosenWeight) {
    //   const foundWeight = templist.find(
    //     weight => weight.time == editChosenWeight.time
    //   );
    //   foundWeight.weight = weight;
    // } else {
    //   const time = new Date().getTime();
    //   templist.unshift({ time, weight });
    // }
    this.setState(
      {
        // weightData: templist,
        showEnterWeightComponent: false
      },
      this.getAllWeights
    );
  }

  closeEnterWeightWindow() {
    this.setState({ showEnterWeightComponent: false });
  }

  closeFirstLaunch() {
    this.setState({ firstLaunch: false });
  }

  render() {
    if (this.state.firstLaunch) {
      return <FirstLaunch closeFirstLaunch={this.closeFirstLaunch} />;
    }
    return (
      <ScrollView style={{ flex: 1 }}>
        <ProgressGauge lastWeight={this.state.weightData[0]} />

        <AddOrModifyWeight
        getAllWeights={this.getAllWeights}
          showEnterWeightComponent={this.state.showEnterWeightComponent}
          closeEnterWeightWindow={this.closeEnterWeightWindow}
          updateListNewOrModified={this.updateListNewOrModified}
          chosenWeightItem={this.state.chosenWeightItem}
        />
        {/* FOR TESTING */}
        {/* <Button title="Clear data" onPress={ClearAllWeights} />
          <Button title="Get Weights" onPress={this.getAllWeights} /> */}
        {/* FOR TESTING */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            // alignSelf: "auto",
            marginTop: 1,
            // alignContent: "space-around",
            justifyContent: "space-between"
          }}
        >
          <Icon
            raised
            name="chart-line"
            type="material-community"
            color={tintColor.tintColor}
            size={28}
            iconStyle={{}}
            containerStyle={{}}
            onPress={() => this.props.navigation.navigate("Weightchart")}
          />
          <Icon
            raised
            name="add-circle-outline"
            type="MaterialIcons"
            color={tintColor.tintColor}
            size={28}
            iconStyle={{}}
            containerStyle={{}} // alignSelf: "flex-end"
            onPress={() => this.setState({ showEnterWeightComponent: true })}
          />
        </View>
        <WeightDataListNativeElements weightData={this.state.weightData} getAllWeights={this.getAllWeights} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // paddingTop: 15,
    // backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
});
