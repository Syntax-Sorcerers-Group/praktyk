import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function DetailsScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
            WILD CARD SCREEN
          </Text>
      </View>
  );
}