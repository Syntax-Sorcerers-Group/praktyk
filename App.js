import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Import Navigation Container
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Import stack navigator
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"; // Import bottom tab navigator
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
  VocabQuestionWords,
  VocabSynonyms,
  GrammarLearning,
  GrammarSTOMPI,
  GrammarTenses,
  GrammarNegative,
  LiteratureLearning,
  // Leaderboard
  LeaderboardScreen,
  VocabCommonComp,
  VocabQuestionComp,
  VocabSynonymsComp,
  // Competitive
  GrammarNegativeComp,
  GrammarSTOMPIComp,
  GrammarTensesComp,
} from "./pages"; // Import your screens

const Stack = createNativeStackNavigator(); // Create a stack navigator
const Tab = createMaterialBottomTabNavigator(); // Create a bottom tab navigator

// Home tab Stack -  contains all pages that are accessible from the home tab such as Vocab, Grammar, Literature Categories
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Vocab Categories" component={VocabCategories} />
      {/* <Stack.Screen name="VocabCategory" component={VocabCategory} /> */}
      <Stack.Screen name="Grammar Categories" component={GrammarCategories} />
      <Stack.Screen
        name="Literature Categories"
        component={LiteratureCategories}
      />
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
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Wild"
        component={DetailsScreen}
        options={{
          tabBarLabel: "Wild",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="comment-question"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-settings"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function LoginTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-key"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarLabel: "Register",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-plus"
              color={color}
              size={26}
            />
          ),
        }}
      />
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

        {/* Vocab Things */}
        <Stack.Screen name="Vocab Learning" component={VocabLearning} />
        <Stack.Screen
          name="Vocab Question Words"
          component={VocabQuestionWords}
        />
        <Stack.Screen name="Vocab Synonyms" component={VocabSynonyms} />

        <Stack.Screen name="Common Comp" component={VocabCommonComp} />
        <Stack.Screen name="Synonyms Comp" component={VocabSynonymsComp} />
        <Stack.Screen name="Question Comp" component={VocabQuestionComp} />

        {/* Grammar Things */}
        <Stack.Screen name="Grammar Learning" component={GrammarLearning} />
        <Stack.Screen name="STOMPI" component={GrammarSTOMPI} />
        <Stack.Screen name="Tenses" component={GrammarTenses} />
        <Stack.Screen name="Negative Form" component={GrammarNegative} />

        <Stack.Screen name="STOMPI Comp" component={GrammarSTOMPIComp} />
        <Stack.Screen name="Tenses Comp" component={GrammarTensesComp} />
        <Stack.Screen
          name="Negative Form Comp"
          component={GrammarNegativeComp}
        />

        {/* Literature Things */}
        <Stack.Screen
          name="Literature Learning"
          component={LiteratureLearning}
        />

        {/* Leaderboard */}
        <Stack.Screen name="Leaderboard Screen" component={LeaderboardScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
