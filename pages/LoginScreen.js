import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen(props) {
  const navigation = useNavigation();

    const handleLoginSuccess = () => {
      // Assuming you're navigating to the Dashboard screen
      navigation.reset({
        index: 0, // Reset the stack index to 0
        routes: [{ name: 'General' }], // Navigate to the Home screen
      });
    };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Login" onPress={() => handleLoginSuccess()} />
      </View>
    );
  }
  