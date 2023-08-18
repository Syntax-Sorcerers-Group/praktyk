import React from "react";
import { View, Button, StyleSheet } from "react-native";

const BottomNavBar = ({ navigateToHome, navigateToAbout }) => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.buttonContainer}>
        <Button title="Home" onPress={navigateToHome} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="About" onPress={navigateToAbout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between the buttons
    alignItems: "center", // Align buttons vertically in the center
    backgroundColor: "#ccc", // Set your desired background color
    paddingVertical: 10,
    paddingHorizontal: 20, // Add horizontal padding for the buttons
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  buttonContainer: {
    flex: 1, // Equal space for each button
    marginHorizontal: 5, // Add margin between buttons
  },
});

export default BottomNavBar;
