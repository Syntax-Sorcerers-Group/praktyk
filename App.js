// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello World!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./store"; // Import your Redux store
import firebase from './Firebase/firebase';; // Import firebase

// Import your different page components
import HomeScreen from "./pages/HomeScreen";
import AboutScreen from "./pages/AboutScreen";

const Stack = createStackNavigator();

function testFirebase() {
  // Test Firebase
  console.log("Testing Firebase");
  console.log(firebase);
}

export default function App() {
  testFirebase(); // Test Firebase
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          {/* Add more screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
