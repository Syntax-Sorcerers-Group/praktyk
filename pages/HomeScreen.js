import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomNavBar from "../components/BottomNavBar"; // Adjust the relative path

const HomeScreen = ({ navigation }) => {
  const navigateToAbout = () => {
    navigation.navigate("About");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <BottomNavBar navigateToHome={() => {}} navigateToAbout={navigateToAbout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
