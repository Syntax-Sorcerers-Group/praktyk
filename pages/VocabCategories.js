import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function VocabCategories({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>VOCAB Categories</Text>
      <Button
        title="Vocab Learning"
        onPress={() => {
          navigation.navigate("Vocab Learning");
        }}
      />
    </View>
  );
}
