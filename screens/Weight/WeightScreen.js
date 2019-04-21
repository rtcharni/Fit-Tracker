import React from "react";
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
  GetWeightArray,
  GetFirstLaunch
} from "../../utils/AsyncStorage";
import window from "../../constants/Layout";
import tintColor from "../../constants/Colors";
import WeightDataList from "./WeightDataList";
import AddOrModifyWeight from "./AddOrModifyWeight";
import ProgressGauge from "./ProgressGauge/ProgressGauge";
import Tooltip from "react-native-walkthrough-tooltip";
import WeightIcon from "../../assets/icons/WeightIcon";
import ExerciseIcon from "../../assets/icons/ExerciseIcon";
import ProfileIcon from "../../assets/icons/ProfileIcon";

export default class WeightScreen extends React.Component {
  static navigationOptions = {
    title: "Weight"
  };

  constructor(props) {
    super(props);
    this.state = {
      weightData: [],
      showEnterWeightComponent: false,
      walkthrough: false,
      walkthrough1: false,
      walkthrough2: false,
      walkthrough3: false,
      walkthrough4: false,
      walkthrough5: false,
      walkthrough6: false
    };
    this.getAllWeights = this.getAllWeights.bind(this);
    this.closeEnterWeightWindow = this.closeEnterWeightWindow.bind(this);
    this.updateListNewOrModified = this.updateListNewOrModified.bind(this);
  }

  async componentDidMount() {
    const result = await GetFirstLaunch();
    if (!result) {
      this.props.navigation.replace("FirstLaunch");
    } else {
      this.getAllWeights();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const showWalkthrough = this.props.navigation.getParam('showWalkthrough', false);
    if (showWalkthrough && !this.state.walkthrough) {
      this.props.navigation.setParams({ showWalkthrough: false })
      this.setState({walkthrough: true});
    }
  }

  async getAllWeights() {
    const weightData = (await GetWeightArray()).reverse();
    this.setState({ weightData });
  }

  updateListNewOrModified(newWeight, editChosenWeight = null) {
    this.setState({ showEnterWeightComponent: false }, this.getAllWeights);
  }

  closeEnterWeightWindow() {
    this.setState({ showEnterWeightComponent: false });
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1 }}>
        <ProgressGauge lastWeight={this.state.weightData[0] || null} />

        <Tooltip
          animated
          // arrowSize={{ width: 16, height: 8 }}
          childlessPlacementPadding={"30%"}
          isVisible={this.state.walkthrough}
          content={
            <View>
              <Text style={{fontSize: 17}}>Before you start, lets quickly</Text>
              <Text style={{fontSize: 17}}>have a look around!</Text>
            </View>
          }
          placement="top"
          onClose={() =>
            this.setState({ walkthrough: false, walkthrough1: true })
          }
        />

        <Tooltip
          animated
          // arrowSize={{ width: 16, height: 8 }}
          childlessPlacementPadding={"20%"}
          isVisible={this.state.walkthrough1}
          content={
            <View>
              <View style={{ alignSelf: "center" }}>
                <WeightIcon focused={true} />
              </View>
              <Text style={{fontSize: 16}}>On this tab you can see your</Text>
              <Text style={{fontSize: 16}}>weight progress, and manage your</Text>
              <Text style={{fontSize: 16}}>daily entered body weights.</Text>
            </View>
          }
          placement="bottom"
          onClose={() =>
            this.setState({ walkthrough1: false, walkthrough2: true })
          }
        />

        <Tooltip
          animated
          // arrowSize={{ width: 16, height: 8 }}
          childlessPlacementPadding={"20%"}
          isVisible={this.state.walkthrough2}
          content={
            <View>
              <View style={{ alignSelf: "center" }}>
                <ExerciseIcon name={"run-fast"} focused={true} />
              </View>
              <Text style={{fontSize: 16}}>On the second tab you can see your</Text>
              <Text style={{fontSize: 16}}>your weekly exercise progress and</Text>
              <Text style={{fontSize: 16}}>manage your allround exercises.</Text>
              <Text />
            </View>
          }
          placement="bottom"
          onClose={() =>
            this.setState({ walkthrough2: false, walkthrough3: true })
          }
        />

        <Tooltip
          animated
          // arrowSize={{ width: 16, height: 8 }}
          childlessPlacementPadding={"20%"}
          isVisible={this.state.walkthrough3}
          content={
            <View>
              <View style={{ alignSelf: "center" }}>
                <ProfileIcon name={"md-person"} focused={true} />
              </View>
              <Text style={{fontSize: 16}}>On the last tab you can see your</Text>
              <Text style={{fontSize: 16}}>entered goals, and if you wish to</Text>
              <Text style={{fontSize: 16}}>modify your goals please do so.</Text>
              <Text />
            </View>
          }
          placement="bottom"
          onClose={() =>
            this.setState({ walkthrough3: false, walkthrough4: true })
          }
        />

        <AddOrModifyWeight
          getAllWeights={this.getAllWeights}
          showEnterWeightComponent={this.state.showEnterWeightComponent}
          closeEnterWeightWindow={this.closeEnterWeightWindow}
          updateListNewOrModified={this.updateListNewOrModified}
          chosenWeightItem={this.state.chosenWeightItem}
        />
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
          <Tooltip
            animated
            arrowSize={{ width: 15, height: 10 }}
            childlessPlacementPadding={"30%"}
            isVisible={this.state.walkthrough4}
            content={
              <View>
                <Text style={{fontSize: 16}}>Here you can see visual chart.</Text>
              </View>
            }
            placement="auto"
            onClose={() =>
              this.setState({ walkthrough4: false, walkthrough5: true })
            }
          >
            <Icon
              raised
              name="chart-line"
              type="material-community"
              color={tintColor.tintColor}
              size={24}
              iconStyle={{}}
              containerStyle={{}}
              onPress={() => this.props.navigation.navigate("Weightchart")}
            />
          </Tooltip>

          <Tooltip
            animated
            arrowSize={{ width: 15, height: 10 }}
            childlessPlacementPadding={"30%"}
            isVisible={this.state.walkthrough5}
            content={
              <View>
                <Text style={{fontSize: 16}}>Here you can add new entries.</Text>
              </View>
            }
            placement="auto"
            onClose={() => this.setState({ walkthrough5: false, walkthrough6: true })}
          >
            <Icon
              reverse
              name="add-circle-outline"
              type="MaterialIcons"
              color={tintColor.tintColor}
              size={24}
              iconStyle={{}}
              containerStyle={{}} // alignSelf: "flex-end"
              onPress={() => this.setState({ showEnterWeightComponent: true })}
            />
          </Tooltip>
        </View>
        <WeightDataList
          weightData={this.state.weightData}
          getAllWeights={this.getAllWeights}
        />
         <Tooltip
          animated
          // arrowSize={{ width: 16, height: 8 }}
          childlessPlacementPadding={"30%"}
          isVisible={this.state.walkthrough6}
          content={
            <View>
              <Text style={{fontSize: 17}}>Perfect! Your are ready to go!</Text>
            </View>
          }
          placement="top"
          onClose={() =>
            this.setState({ walkthrough6: false })
          }
        />
      </ScrollView>
    );
  }
}
