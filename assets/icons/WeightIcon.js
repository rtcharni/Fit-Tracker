import React from "react";
import { Icon } from 'expo';
import Colors from "../../constants/Colors";

export default class WeightIcon extends React.Component {
  render() {
    return (
      <Icon.MaterialCommunityIcons
        name='weight'
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
