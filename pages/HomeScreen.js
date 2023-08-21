
import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function HomeScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text
              onPress={() => alert('This is the "Home" screen.')} // when you press the home screen icon, it will alert you with this message
              style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text>
      </View>
  );
}
