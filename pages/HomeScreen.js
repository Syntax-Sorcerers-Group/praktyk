import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import CustomCard from "../components/CustomCards";

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
    <ScrollView>
      <View>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text>Hello, this is a Text {isvalue}!</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Vocab Screen"
                onPress={() => {
                  navigation.navigate("Vocab Categories");
                }}
              />
              <Button
                title="Grammar Screen"
                onPress={() => {
                  navigation.navigate("Grammar Categories");
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

        <CustomCard
          title="Vocabulary"
          imageUrl="https://picsum.photos/700"
          onPress={() => {
            navigation.navigate("Vocab Categories");
          }}
        />

        <CustomCard
          title="Grammar"
          imageUrl="https://picsum.photos/800"
          onPress={() => {
            navigation.navigate("Grammar Categories");
          }}
        />

        <CustomCard
          title="Literature"
          imageUrl="https://picsum.photos/900"
          onPress={() => {
            navigation.navigate("Literature Categories");
          }}
        />
      </View>
    </ScrollView>
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
