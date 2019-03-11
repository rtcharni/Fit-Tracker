import { AsyncStorage } from "react-native";

export const SaveWeight = async value => {
  // Get data and push new value to end
  let storedData = await GetWeightArray();
  if (storedData === null) {
    storedData = [];
    storedData.push(value);
  } else {
    storedData.push(value);
  }
  console.log(storedData);
  // Save updated data to storage
  try {
    // console.log(data);
    await AsyncStorage.setItem("Weight", JSON.stringify(storedData));
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

export const DeleteWeight = async (weight) => {
  const storedData = await GetWeightArray();
  const index = storedData.findIndex(x => x.time == weight.time);
  storedData.splice(index, 1)
  // Save data back
  try {
    await AsyncStorage.setItem("Weight", JSON.stringify(storedData));
    return true;
  } catch (error) {
    // TODO handeError
  }
}

// TODO 
export const EditWeight = async (chosenWeight, newValue) => {
  const storedData = await GetWeightArray();
  const foundWeight = storedData.find(x => x.time == chosenWeight.time);
  // Edit weight!
  foundWeight.weight = newValue;
  // Save data back
  try {
    await AsyncStorage.setItem("Weight", JSON.stringify(storedData));
    return true;
  } catch (error) {
    // TODO handeError
  }
}

export const SaveProfile = async (newProfile) => {
  try {
    await AsyncStorage.setItem("Profile", JSON.stringify(newProfile));
  } catch (error) {
    // TODO handeError
  }
}

export const GetProfile = async () => {
  try {
    const response = await AsyncStorage.getItem("Profile");
    return response ? JSON.parse(response) : response;
  } catch (error) {
    // TODO handeError
  }
};

export const ClearProfile = async () => {
  try {
    await AsyncStorage.removeItem("Profile");
  } catch (error) {}
};