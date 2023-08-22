import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function VocabCategory(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
            VOCAB CATEGORY SCREEN
        </Text>
    </View>
  );
}