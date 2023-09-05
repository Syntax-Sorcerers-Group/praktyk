import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function GrammarSTOMPI(props) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
        GRAMMAR STOMPI WORKS
      </Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
