import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../assets/icons/TabBarIcon";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ExerciseScreen from "../screens/Exercise/ExerciseScreen";
import WeightScreen from "../screens/Weight/WeightScreen";
import WeightIcon from "../assets/icons/WeightIcon";
import WeightChart from "../screens/Weight/Weightchart/WeightChart";
import ProfileIcon from "../assets/icons/ProfileIcon";
import ExerciseIcon from "../assets/icons/ExerciseIcon";
import FirstLaunch from "../screens/First-launch/FirstLaunch";
import ExerciseChart from "../screens/Exercise/ExerciseChart/ExerciseChart";

const stackNavigatorConfig = {
  headerBackTitleVisible: true,
  headerLayoutPreset: "center"
  // headerMode: "none"
};

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  stackNavigatorConfig
);

ProfileStack.navigationOptions = {
  gesturesEnabled: true,
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <ProfileIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

const ExerciseStack = createStackNavigator(
  {
    Exercise: ExerciseScreen,
    ExerciseChart: ExerciseChart
  },
  stackNavigatorConfig
);

ExerciseStack.navigationOptions = {
  gesturesEnabled: true,
  tabBarLabel: "Exercise",
  tabBarIcon: ({ focused }) => (
    <ExerciseIcon focused={focused} name={"run-fast"} />
  )
};

const WeightStack = createStackNavigator(
  {
    Weight: WeightScreen,
    Weightchart: WeightChart,
    FirstLaunch: FirstLaunch
  },
  stackNavigatorConfig
);

WeightStack.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {
    gesturesEnabled: true,
    tabBarLabel: "Weight",
    tabBarIcon: ({ focused }) => <WeightIcon focused={focused} />
  };
  if (routeName === 'FirstLaunch') {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

export default createBottomTabNavigator(
  {
    WeightStack,
    ExerciseStack,
    ProfileStack
  },
  {
    initialRouteName: "ProfileStack",
    animationEnabled: true,
    tabBarOptions: { showLabel: true },
    swipeEnabled: true,
    resetOnBlur: true,
    tabBarOptions: { showLabel: false }
    // animationEnabled: true
    // defaultNavigationOptions: {}
  }
);
