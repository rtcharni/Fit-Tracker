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
  TouchableHighlight,
  Alert
} from "react-native";
import { WebBrowser } from "expo";
import { TESTDATAWEIGHTS } from "./TESTDATA";
import { DeleteWeight } from "../../utils/AsyncStorage";

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
    console.log(item);
  }

  onItemLongPress(item) {
    Alert.alert(
      "Item modification",
      "Do you want to modify this item?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => this.deleteItem(item),
          style: "destructive"
        },
        {
          text: "Edit",
          onPress: () => this.editItem(item),
          style: "default"
        }
      ],
      { cancelable: true }
    );
  }

  async deleteItem(item) {
    console.log("Delete Pressed");
    console.log(item);
    const response = await DeleteWeight(item);
    const index = this.state.weightData.findIndex(x => x.time == item.key);
    const tempData = this.state.weightData;
    tempData.splice(index, 1);
    this.setState({weightData: tempData});
  }
  async editItem(item) {
    // Open other windows to edit!! weight value and/or date/time
  }

  constructListData() {
    return this.state.weightData.map(x => {
      return {
        time: new Date(x.time).toLocaleDateString(),
        weight: x.weight,
        key: x.time.toString()
      };
    });
  }

  render() {
    return (
      <View>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={[highlighted && { marginLeft: 0 }]} />
          )}
          // style={{flex: 1}}
          scrollEnabled={true}
          data={this.constructListData()}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => this.onItemPress(item)}
              onLongPress={() => this.onItemLongPress(item)}
              // onShowUnderlay={"red"}
              // onHideUnderlay={"blue"}
              underlayColor="lightgrey"
              activeOpacity={0.5}
            >
              <View>
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
