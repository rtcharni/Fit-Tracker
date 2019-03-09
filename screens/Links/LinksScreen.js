import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ChartView from 'react-native-highcharts';
import WeightChart from './Weightchart/WeightChart';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Chart',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <WeightChart/>
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
