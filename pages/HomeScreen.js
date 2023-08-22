
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Vocab Screen" onPress={() => {navigation.navigate("Vocab")}} />
      <Button title="Grammar Screen" onPress={() => {navigation.navigate("Grammar")}} />
    </View>
  );
}
