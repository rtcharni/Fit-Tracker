import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../assets/icons/TabBarIcon";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import WeightScreen from "../screens/Weight/WeightScreen";
import WeightIcon from "../assets/icons/WeightIcon";
import WeightChart from "../screens/Weight/Weightchart/WeightChart";
import ProfileIcon from "../assets/icons/ProfileIcon";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
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

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <ProfileIcon focused={focused} name={Platform.OS === "ios" ? "ios-person" : "md-person"}/>
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

const WeightStack = createStackNavigator({
  Weight: WeightScreen,
  Weightchart: WeightChart
});

WeightStack.navigationOptions = {
  tabBarLabel: "Weight",
  tabBarIcon: ({ focused }) => <WeightIcon focused={focused} />
};

export default createBottomTabNavigator({
  WeightStack,
  HomeStack,
  ProfileStack,
  SettingsStack
}, {initialRouteName: "WeightStack"});
