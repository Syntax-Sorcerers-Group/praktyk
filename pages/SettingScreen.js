import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import Button from "../components/ButtonComponent";
import Popup from "../components/Popup";
import DisplayBox from "../components/DisplayBox";
import Imagebox from "../components/ImageDisplay";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditableInputBox from "../components/EditableInputBox";

export default function SettingScreen({ navigation }) {
  // Declare a state to hold the email
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState(""); // State to store the username
  const [loading, setLoading] = React.useState(false);

  // States to display pop up
  const [popupState, setPopupState] = useState(false);
  const [popupText, setPopupText] = useState("");

  //function for log out button
  const logout = async () => {
    try {
      // Assuming 'userEmail' is the key used to determine a user's logged-in state
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("username");

      // If you are using React Navigation, navigate to the 'Login' screen or the initial route
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginTabs" }],
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  //Function to update username in the database
  const updateUsername = async () => {
    setLoading(true); // Start loading

    try {
      // Prepare the data to be sent to the API
      const data = {
        email: email,
        username: username, // New username to update
      };

      // Make the API call to update the username
      const response = await axios.post(
        // Assuming the method to update is PUT, change if needed
        `${APP_ENV_PRAKTYK_API_LINK}/api/update/user`, // The endpoint might be different for updating data
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": APP_ENV_PRAKTYK_API_KEY,
          },
        }
      );

      if (response && response.data) {
        setPopupText("Updated Username successfully"); // Set the success message
        await AsyncStorage.setItem("username", username); // Update the username in AsyncStorage
        setPopupState(true); // Show the popup
        setTimeout(() => {
          setPopupState(false); // Hide the popup after 3 seconds
        }, 3000);
        // Rest of your logic
      } else {
        // Handle the case where there is no response data
        setPopupText("Failed to update username. Please try again."); // Set an error message
        setPopupState(true); // Show the popup
        setTimeout(() => {
          setPopupState(false); // Hide the popup after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating username:", error);
      // Maybe set an error message for the user to see
    } finally {
      setLoading(false); // Stop loading regardless of the result
    }
  };

  // Effect to run once on component mount
  useEffect(() => {
    const getEmail = async () => {
      try {
        //gets email when user logs in
        const userEmail = await AsyncStorage.getItem("userEmail");
        if (userEmail !== null) {
          //stores the users email in state
          setEmail(userEmail);
          // After setting the email, attempt to get the username
          getEmailFromDataBase(userEmail);
        }
      } catch (error) {}
    };
    //uses api to get username from database and uses email to get username
    const getEmailFromDataBase = async (userEmail) => {
      const data = {
        email: userEmail, // actual email variable
      };

      try {
        const response = await axios.post(
          `${APP_ENV_PRAKTYK_API_LINK}/api/get/user`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": APP_ENV_PRAKTYK_API_KEY,
            },
          }
        );

        if (response && response.data) {
          // Assuming the username is a property on the response data object
          setUsername(response.data.username); // Replace with actual property name
        } else {
          console.log("Error: No response data from the server.");
        }
      } catch (error) {
        console.error("Error retrieving username:", error);
      }
    };

    getEmail();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
    >
      <View style={styles.image}>
        <Imagebox
          imgSource={require("../assets/user_icon.png")}
          imgSize={200}
        />
      </View>
      <View style={styles.components}>
        <DisplayBox label="Email" value={email} />
        <EditableInputBox
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          isDisabled={false} // Set to true if you want to disable editing
        />
        <Button
          displayText="Update Username"
          icon="login"
          mode="elevated"
          onPress={updateUsername} // Attach the update function here
          loadingState={loading} // Use the loading state to show a loading indicator
        />
        <Button
          displayText="Log Out"
          icon="logout" // Replace with the actual icon name if you use icons
          mode="outlined" // Or any other style you prefer
          onPress={logout} // Attach the logout function here
        />
        <Popup
          state={popupState}
          displayText={popupText}
          labelText="Ok"
          setState={() => {
            setPopupState(false);
          }}
          timeout={3000}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 150,
    alignSelf: "center",
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    justifyContent: "center",
  },
  components: {
    paddingTop: 70,
    gap: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
