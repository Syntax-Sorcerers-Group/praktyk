import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomCard from "../components/CustomCards";

export default function GrammarCategories({ navigation }) {
  return (
    <ScrollView testID="grammar-categories-scrollview">
      <CustomCard
        title="STOMPI"
        imageUrl="https://picsum.photos/700"
        onPress={() => {
          navigation.navigate("STOMPI");
        }}
        testID="stomp-custom-card" // Add testID here
      />
      <CustomCard
        title="Tenses"
        imageUrl="https://picsum.photos/800"
        onPress={() => {
          navigation.navigate("Tenses");
        }}
        testID="tenses-custom-card" // Add testID here
      />
      <CustomCard
        title="Negative Form"
        imageUrl="https://picsum.photos/900"
        onPress={() => {
          navigation.navigate("Negative Form");
        }}
        testID="negative-form-custom-card" // Add testID here
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20, // Add some padding to space out the content
  },
});
