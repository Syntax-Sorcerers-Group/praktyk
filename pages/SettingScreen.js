import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SettingScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
            Settings Screen
          </Text>
      </View>
  );
}