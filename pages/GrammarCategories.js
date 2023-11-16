import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import CustomCard from "../components/CustomCards";

export default function GrammarCategories() {
  const navigation = useNavigation();
  const route = useRoute();

  // Retrieve the selectedGrade parameter from the route
  const selectedGrade = route.params?.selectedGrade || "Not Selected";
  return (
    <ScrollView testID="grammar-categories-scrollview">
      <CustomCard
        title="STOMPI"
        imageUrl="https://picsum.photos/700"
        onPress={() => {
          navigation.navigate("STOMPI",{
            selectedGrade,
          }
          );
        }}
        testID="stomp-custom-card" // Add testID here
      />
      <CustomCard
        title="Tenses"
        imageUrl="https://picsum.photos/800"
        onPress={() => {
          navigation.navigate("Tenses",{
            selectedGrade,
          }
          );
        }}
        testID="tenses-custom-card" // Add testID here
      />
      <CustomCard
        title="Negative Form"
        imageUrl="https://picsum.photos/900"
        onPress={() => {
          navigation.navigate("Negative Form",{
            selectedGrade,
          }
          );
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
