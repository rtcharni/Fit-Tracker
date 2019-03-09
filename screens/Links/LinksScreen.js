import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ChartView from 'react-native-highcharts';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Chart',
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
