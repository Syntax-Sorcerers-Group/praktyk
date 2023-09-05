import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomCard from "../components/CustomCards";

export default function GrammarCategories({ navigation }) {
  return (
    <ScrollView>
      <CustomCard
        title="STOMPI"
        imageUrl="https://picsum.photos/700"
        onPress={() => {
          navigation.navigate("STOMPI");
        }}
      />
      <CustomCard
        title="Custom Card 2"
        imageUrl="https://picsum.photos/800"
        onPress={() => {
          navigation.navigate("Grammar Learning");
        }}
      />
      <CustomCard
        title="Custom Card 3"
        imageUrl="https://picsum.photos/900"
        onPress={() => {
          navigation.navigate("Grammar Learning");
        }}
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
