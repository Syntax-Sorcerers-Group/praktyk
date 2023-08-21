
import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function DetailsScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text
              onPress={() => navigation.navigate('Home')} // directs you to the home page when you press the about text
              style={{ fontSize: 26, fontWeight: 'bold' }}>Details Screen</Text>
      </View>
  );
}