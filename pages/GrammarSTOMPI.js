import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DuoDragDrop from "@jamsch/react-native-duo-drag-drop";

export default function GrammarSTOMPI(props) {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>
        <DuoDragDrop
          words={[
            "Daggy",
            "and",
            "Sayf",
            "suffered",
            "for",
            "this",
            "to",
            "work",
          ]}
        />
      </View>
    </GestureHandlerRootView>
  );
}
