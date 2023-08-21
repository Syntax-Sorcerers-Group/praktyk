import React from "react";
import { View, Button, StyleSheet,Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';

//Screens
import HomeScreen from "../pages/HomeScreen";
import DetailsScreen from "../pages/DetailsScreen";
import AboutScreen from "../pages/AboutScreen";

//Screen names
const HomeScreenName = "Home";
const DetailsScreenName = "Details";
const AboutScreenName = "About";

const Tab = createBottomTabNavigator();

export default function BottomNavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={HomeScreenName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === HomeScreenName) {
              iconName = focused ? 'home' : 'home-outline';//icon for home
            }
            else if (rn === DetailsScreenName) {
              iconName = focused ? 'list' : 'list-outline';//icon for details
            }
            else if (rn === AboutScreenName) {
              iconName = focused ? 'information-circle' : 'information-circle-outline';//icon for about
            }
            return <Ionicons name={iconName} size={size} color={color} />;//can change these manually if you want
          },
        })}
        //style for the nav bar
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'grey',
          labelStyle: { fontSize: 10 },
          style: { height: 80, borderTopWidth: 2, borderTopColor: 'white' },
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]

        }}>

        <Tab.Screen name={HomeScreenName} component={HomeScreen} />
        <Tab.Screen name={DetailsScreenName} component={DetailsScreen} />
        <Tab.Screen name={AboutScreenName} component={AboutScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
