import React from "react";
import { View, Text, StyleSheet, Button} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
            GRAMMAR SCREEN
        </Text>
        <Button title="Grammar Category" onPress={() => {navigation.navigate('Tabless', { screen: 'GrammarCategory' })}} />
    </View>
  );
}