import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Grammarcategroy(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
            GRAMMAR CATEGORY SCREEN
        </Text>
    </View>
  );
}