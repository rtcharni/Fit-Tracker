import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../assets/icons/TabBarIcon";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ExerciseScreen from "../screens/Exercise/ExerciseScreen";
import WeightScreen from "../screens/Weight/WeightScreen";
import WeightIcon from "../assets/icons/WeightIcon";
import WeightChart from "../screens/Weight/Weightchart/WeightChart";
import ProfileIcon from "../assets/icons/ProfileIcon";
import ExerciseIcon from "../assets/icons/ExerciseIcon";

const stackNavigatorConfig = {
  headerBackTitleVisible: true,
  headerLayoutPreset: "center"
  // headerMode: "none"
};

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  stackNavigatorConfig
);

HomeStack.navigationOptions = {
  gesturesEnabled: true,
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
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
    Exercise: ExerciseScreen
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
    Weightchart: WeightChart
  },
  stackNavigatorConfig
);

WeightStack.navigationOptions = {
  gesturesEnabled: true,
  tabBarLabel: "Weight",
  tabBarIcon: ({ focused }) => <WeightIcon focused={focused} />
};

export default createBottomTabNavigator(
  {
    WeightStack,
    ExerciseStack,
    ProfileStack,
    HomeStack
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

