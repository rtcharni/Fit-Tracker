import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  SectionList,
  FlatList,
  TouchableHighlight
} from "react-native";
import { WebBrowser } from "expo";
import { TESTDATAWEIGHTS } from "./TESTDATA";

export default class WeightDataList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightData: this.props.weightData
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.weightData !== prevState.weightData) {
      return {
        weightData: nextProps.weightData
      };
    }
    return null;
  }

  onItemPress(item) {
    // console.log(item);
  }

  constructListData() { // FIRST OPTION!
    return this.state.weightData.map(x => {
      return {
        time: new Date(x.time).toLocaleDateString(),
        weight: x.weight,
        key: x.time
      };
    });
  }

  render() { // SECOND OPTION
    const secondOption = this.state.weightData.map(x => {
      return {
        time: new Date(x.time).toLocaleDateString(),
        weight: x.weight,
        key: x.time
      };
    });

    return (
      <View>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={[highlighted && { marginLeft: 0 }]} />
            )}
            data={this.constructListData()} // HERE {secondOption}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => this.onItemPress(item)}
              // onShowUnderlay={"red"}
              // onHideUnderlay={"blue"}
              underlayColor="lightgrey"
              activeOpacity={0.5}
            >
              <View style={styles.row}>
                <Text style={styles.rowItem}>{item.time}</Text>
                <Text style={styles.rowItem}>{item.weight}kg</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 3,
    paddingBottom: 3
  },
  rowItem: {
    fontSize: 15
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

// constructSections() {
//     const constructedSections = [];
//     TESTDATAWEIGHTS.forEach((item, index) => {
//       const date = new Date(item.time);
//     })
//   }
