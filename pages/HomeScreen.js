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
    <View >
      <View style={styles.dropdownViewContainer}>  
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          items={items}
          setItems={setItems}
          open={isopen}
          value={isvalue}
          setValue={setIsvalue}
          setOpen={setIsopen}
          maxHeight={200}
          autoScroll
          itemSeparator={true}
          placeholder="Select Your Grade"
          placeholderStyle={{ fontSize: 16, color: "grey" }}
          style={styles.dropdownPicker} 
          textStyle={styles.dropdownText} // Apply custom styles for text
          containerStyle={styles.pickerContainerStyle}
          dropDownContainerStyle={styles.dropDownContainerStyle} // Added for lines between options
          selectedItemContainerStyle={{
            backgroundColor: "#AFE1AF"
          }}

          itemSeparatorStyle={{
            marginLeft:10,
            marginRight:30,
            borderBlockColor:"#ccc",
            borderTopWidth: 1, // Add grey lines between options
            marginTop: -1,
          }}

          arrowColor="purple" // Customize the arrow color
        ></DropDownPicker>
      </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text>Hello, this is a Text {isvalue}!</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
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
    </View>
  );
}

//Temp style sheet for now
const styles = StyleSheet.create({
  //Makes the dropdown over lay + center
  dropdownViewContainer:{
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  //For cards
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //Applys outside styling to the drop down
  dropdownContainer: {
    width: "80%", // Adjust the width as needed
    marginTop: 20,
    zIndex: 1,
  },

  dropdownPicker: {
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 20, // Adjust the roundness
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: "#555",
    fontWeight:"bold"
  },
  selectedtxt: {
    fontSize: 16,
    color: "green",
    fontWeight:"bold"
  },
  pickerContainerStyle: {
    borderWidth: 0, // Remove border when open
  },

  dropDownContainerStyle: {
    borderColor: "#ccc",
    borderBlockColor:"#ccc",
    borderRadius:20,
    borderTopWidth: 1, // Add grey lines between options
    marginTop: -1, // To make the line fit properly
  },

  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
});
