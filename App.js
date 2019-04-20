import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";
import AppNavigator from "./navigation/AppNavigator";
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Root>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </Root>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png"),
        require("./assets/images/apple.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
        // SpaceMono_bold: require('./assets/fonts/SpaceMono-Bold.ttf'),
        // SpaceMono_italic: require('./assets/fonts/SpaceMono-Italic.ttf'),
        // SpaceMono_boldItalic: require('./assets/fonts/SpaceMono-BoldItalic.ttf'),
        Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
        Roboto_bold: require('./assets/fonts/Roboto-Bold.ttf'),
        Roboto_italic: require('./assets/fonts/Roboto-Italic.ttf'),
        Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
        // ADDED FROM NATIVE-BASE DOCS!
        // Roboto: require("native-base/Fonts/Roboto.ttf"),
        // Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setDefaultFont();
    this.setState({ isLoadingComplete: true });
  };

  setDefaultFont() {
    const customTextProps = {
      style: {
        fontFamily: 'Roboto'
      }
    };
    setCustomText(customTextProps);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
