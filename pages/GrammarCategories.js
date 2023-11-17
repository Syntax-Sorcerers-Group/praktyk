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
        imageUrl="https://en-blog.lingualbox.com/wp-content/uploads/2020/10/pexels-pixabay-278890-1024x628.jpg"
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
        imageUrl="https://www.thoughtco.com/thmb/N07EPW4L-8PyLkxlRyLF2L8JFnw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Getty_tense-155096784-56af9f573df78cf772c6c6dd.jpg"
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
        imageUrl="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/03/Negatives-2.jpg"
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
