import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import InputBox from "../components/InputBox";
import Button from "../components/ButtonComponent";
import Popup from "../components/Popup";
import Imagebox from "../components/ImageDisplay";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from '@env';
import axios, { all } from "axios";

export default function RegisterScreen({ navigation }) {
    // General variables
    const [loading, setLoading] = React.useState(false);

    // Detail variables
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    // Popup visibility variable 
    const [popupState, setPopupState] = React.useState(false);
    const [popupText, setPopupText] = React.useState("");

    // Usage example
    const userData = {
      "email": email,
      "username": username,
      "password": password
    };

    const signUp = async (userData) => {
      try {
        const response = await axios.post(
          `${APP_ENV_PRAKTYK_API_LINK}/api/post/signup`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": APP_ENV_PRAKTYK_API_KEY,
            },
          }
        );

        if (response && response.data) {
          setLoading(false);
          navigation.navigate("Login");
        } else {
          setPopupState(true);
          setPopupText("An unknown error occurred. Please try again.");
        }
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.data) {
          setPopupState(true);
          let errorMessage = error.response.data.errorMessage;

          // Remove "Firebase." from the beginning of the errorMessage
          errorMessage = errorMessage.replace(/^Firebase:\s*/, '');
      
          // Remove any text inside brackets and the brackets themselves
          errorMessage = errorMessage.replace(/\(.*?\)\./g, '');
      
          setPopupText(errorMessage);
        } else {
          setPopupState(true);
          setPopupText("An error occurred while registering.");
        }
      }
    };

    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          `${APP_ENV_PRAKTYK_API_LINK}/api/get/allUsers`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": APP_ENV_PRAKTYK_API_KEY,
            },
          }
        );

        if (response && response.data) {
          return response.data;
        } else {
          setPopupState(true);
          setPopupText("An unknown error occurred. Please try again.");
        }
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.data) {
          setPopupState(true);
          let errorMessage = error.response.data.errorMessage;

          // Remove "Firebase." from the beginning of the errorMessage
          errorMessage = errorMessage.replace(/^Firebase:\s*/, '');
      
          // Remove any text inside brackets and the brackets themselves
          errorMessage = errorMessage.replace(/\(.*?\)\./g, '');
      
          setPopupText(errorMessage);
        } else {
          setPopupState(true);
          setPopupText("An error occurred while registering.");
        }
      }
    };

    const checkIfUserExists = (allUsers, userData) => {
      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username.trim() === userData.username.trim()) {
          return true;
        }
      }
      return false;
    };

    async function handleRegister() {
      setLoading(true);
      let users = await getAllUsers();
      if ((password !== confirmPassword)) {
        setLoading(false);
        setPopupState(true);
        setPopupText("Passwords do not match.");
        return;
      } else if (!email || !username|| !password || !confirmPassword) {
        setLoading(false);
        setPopupState(true);
        setPopupText("Please fill in all fields.");
        return;
      } else if (checkIfUserExists(users, userData)) {
        setLoading(false);
        setPopupState(true);
        setPopupText("Username already exists.");
        return;
      }
        signUp(userData);
    }

    return (
      <ScrollView contentContainerStyle={styles.page} 
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <View style={styles.image}>
          <Imagebox 
            imgSource={require('../assets/splash-screen.jpg')}
            imgSize={200}
          />
        </View>
        <View style={styles.components}>
          <InputBox 
            autoComplete="email" 
            placeHolder="Email"
            onChange={(value) => setEmail(value.nativeEvent.text)}
          />
          <InputBox
            placeHolder="Username"
            onChange={(value) => setUsername(value.nativeEvent.text)}
          />
          <InputBox
            autoComplete="password"
            placeHolder="Password"
            onChange={(value) => setPassword(value.nativeEvent.text)}
            icon="eye"
          />
          <InputBox
            autoComplete="password"
            placeHolder="Confirm Password"
            onChange={(value) => setConfirmPassword(value.nativeEvent.text)}
            icon="eye"
          />
          <Button
            displayText="Register"
            icon="login"
            mode="elevated"
            onPress={() => handleRegister()}
            loadingState={loading}
          />
          <View style={styles.popupContainer}>
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
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 332,
    alignSelf: "center",
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    justifyContent: "center",
  },
  components: {
    paddingTop: 50,
    gap: 20,
  },
  popupContainer: {
    marginTop: 140, // Adjust this value as needed to position the Popup higher
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});