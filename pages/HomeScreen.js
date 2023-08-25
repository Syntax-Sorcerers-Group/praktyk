import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  //State variablles
  const [isopen, setIsopen] = useState(false);
  const [isvalue, setIsvalue] = useState(null);
  const [items, setItems] = useState([
    { label: "Grade 8", value: "8" },
    { label: "Grade 9", value: "9" },
    { label: "Grade 10", value: "10" },
    { label: "Grade 11", value: "11" },
    { label: "Grade 12", value: "12" },
  ]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text>Hello, this is a Text {isvalue}!</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Vocab Screen"
              onPress={() => {
                navigation.navigate("Vocab");
              }}
            />
            <Button
              title="Grammar Screen"
              onPress={() => {
                navigation.navigate("Grammar");
              }}
            />
          </View>
        </View>
      </View>

      {/* Dropdown picker  */}
      <View>
        <DropDownPicker
          items={items}
          setItems={setItems}
          open={isopen}
          value={isvalue}
          setValue={setIsvalue}
          setOpen={setIsopen}
          maxHeight={200}
          autoScroll
          placeholder="Select Your Grade"
          placeholderStyle={{ fontSize: 16, fontWeight: "bold" }}
          style={{ zIndex: 1 }}
        ></DropDownPicker>
      </View>
    </View>
  );
}


//Temp style sheet for now
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});
