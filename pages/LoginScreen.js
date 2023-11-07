import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputBox from "../components/InputBox";
import Button from "../components/ButtonComponent";
import Popup from "../components/Popup";
import Imagebox from "../components/ImageDisplay";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from "@env";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen(props) {
  // General variables
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  // Detail variables
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Popup visibility variable
  const [popupState, setPopupState] = React.useState(false);
  const [popupText, setPopupText] = React.useState("");

  const userData = {
    email: email,
    password: password,
  };

  const signIn = async (userData) => {
    try {
      const response = await axios.post(
        `${APP_ENV_PRAKTYK_API_LINK}/api/post/signin`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": APP_ENV_PRAKTYK_API_KEY,
          },
        }
      );

      if (response && response.data) {
        // Store the email in sessionStorage
        AsyncStorage.setItem('userEmail', email);
        console.log("User email stored in AsyncStorage.", email);
        navigation.reset({
          index: 0,
          routes: [{ name: "General" }],
        });
      } else {
        setPopupState(true);
        setPopupText("Email and/or password is incorrect.");
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
        setPopupText("An error occurred while signing in.");
      }
    }
  };

  // Inside your handleLogin function
  function handleLogin() {
    setLoading(true);

    if (!email || !password) {
      // Check if email or password is missing
      setLoading(false);
      setPopupState(true);
      setPopupText("Email and/or password is missing.");
      return;
    }

    // Trigger the sign-in process
    signIn(userData);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
    >
      <View style={styles.image}>
        <Imagebox
          imgSource={require("../assets/splash-screen.jpg")}
          imgSize={200}
        />
      </View>
      <View style={styles.components}>
        <InputBox
          testID="Email"
          autoComplete="email"
          onChange={(value) => setEmail(value.nativeEvent.text)}
          placeHolder="Email"  
          />
        <InputBox
          testID="Password"
          autoComplete="password"
          onChange={(value) => setPassword(value.nativeEvent.text)}
          placeHolder="Password"
          icon="eye"
        />
        <Button
          displayText="Login"
          icon="login"
          mode="elevated"
          onPress={() => handleLogin()}
          loadingState={loading}
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
    paddingTop: 50,
    gap: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
