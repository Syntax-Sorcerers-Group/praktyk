import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomNavBar from "../components/BottomNavBar";

const AboutScreen = ({ navigation }) => {
  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Screen</Text>
      <BottomNavBar navigateToHome={navigateToHome} navigateToAbout={() => {}} />
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

AboutScreen.navigationOptions = {
  headerLeft: null,
  headerShown: false, // Hide the back arrow in the header
};



export default AboutScreen;
