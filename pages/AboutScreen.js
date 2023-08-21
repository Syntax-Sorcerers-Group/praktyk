import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text
              onPress={() => navigation.navigate('Home')}//re directes you to the home screen when you press the details screen text
              style={{ fontSize: 26, fontWeight: 'bold' }}>About Screen</Text>
      </View>
  );
}