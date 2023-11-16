import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LiteratureCategories({ navigation }) {
  // Retrieve the selectedGrade parameter from the route
  // const selectedGrade = route.params?.selectedGrade || "Not Selected";
  const selectedGrade = 12;

  const catergoryField = "set_literature";

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
        Literature Categories
      </Text>
      <Button
        title="Literature Learning"
        onPress={() => {
          navigation.navigate("Literature Learning", {
            selectedGrade,
            catergoryField,
          }); // Pass selectedGrade as a parameter
        }}
      />
    </View>
  );
}
