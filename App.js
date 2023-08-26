import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Import Navigation Container
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Import stack navigator
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"; // Import bottom tab navigator
import store from "./store"; // Import your Redux store
import firebase from "./Firebase/firebase"; // Import firebase
import {
  // Main Screens
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  DetailsScreen,
  SettingScreen,
  // Catergories
  VocabCategories,
  GrammarCategories,
  LiteratureCategories,
  // Learning
  VocabLearning,
  GrammarLearning,
  LiteratureLearning,
} from "./pages"; // Import your screens

const Stack = createNativeStackNavigator(); // Create a stack navigator
const Tab = createMaterialBottomTabNavigator(); // Create a bottom tab navigator

function testFirebase() {
  // Test Firebase
  console.log("Testing Firebase");
  console.log(firebase);
}
// NAV LESS TABS
// All tabs without a navigation bar (Vocab, Grammar, Literature Learning)
function NavLessStack() {
  return (
    <Stack.Navigator>
      {/* MOVE THESE 2 BACK TO HOMESTACK */}
      <Stack.Screen name="Vocab Learning" component={VocabLearning} />
      <Stack.Screen name="Grammar Learning" component={GrammarLearning} />
      <Stack.Screen name="Literature Learning" component={LiteratureLearning} />
    </Stack.Navigator>
  );
}

// Home tab Stack -  contains all pages that are accessible from the home tab such as Vocab, Grammar, Literature Categories
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Vocab Categories" component={VocabCategories} />
      {/* <Stack.Screen name="VocabCategory" component={VocabCategory} /> */}
      <Stack.Screen name="Grammar Categories" component={GrammarCategories} />
      <Stack.Screen name="Literature Categories" component={LiteratureCategories} />
    </Stack.Navigator>
  );
}

// /* To create a stack on any other tab:
//   1. Copy above function, rename, add necessary pages
//   2. Add to Tab.Navigator below
// */

// General tab structure for all tabs with a navigation bar
function GeneralTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="Wild" component={DetailsScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}

function LoginTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  );
}
//TODO: Change tabless to NavBarLess
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginTabs"
          component={LoginTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="General"
          component={GeneralTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NavLessStack"
          component={NavLessStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
