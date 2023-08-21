import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomNavBar from "./components/BottomNavBar"; // Adjust the relative path
import store from "./store"; // Import your Redux store
import firebase from './Firebase/firebase';; // Import firebase

function testFirebase() {
  // Test Firebase
  console.log("Testing Firebase");
  console.log(firebase);
}

function App() {
  testFirebase(); // Test Firebase
  return (
    <BottomNavBar />//creates the bottom nav bar from the bottom nav bar component
  );
}

export default App;


