import { AsyncStorage } from "react-native";

export const SaveWeight = async value => {
  // Get data and push new value to end
  let data = await GetWeightArray();
  if (data === null) {
    data = [];
    data.push(value);
  } else {
    data.push(value);
  }
  console.log(data);
  // Save updated data to storage
  try {
    // console.log(data);
    await AsyncStorage.setItem("Weight", JSON.stringify(data));
    return true;
  } catch (error) {
    // TODO handeError
  }
};

export const GetWeightArray = async () => {
  try {
    const response = await AsyncStorage.getItem("Weight");
    const weightArray = await JSON.parse(response);
    return weightArray;
  } catch (error) {
    // TODO handeError
  }
};

export const ClearAllWeights = async () => {
  try {
    await AsyncStorage.removeItem("Weight");
  } catch (error) {}
};
