import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
       
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
