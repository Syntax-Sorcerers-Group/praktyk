import React from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputBox from "../components/InputBox";
import Button from "../components/ButtonComponent";
import Popup from "../components/Popup";
import Imagebox from "../components/ImageDisplay";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from "@env";
import axios from "axios";

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

      return response;
    } catch (error) {
      // Access the error message directly from the 'error' object
      setLoading(false);
      setPopupState(true);
      setPopupText(error.response.data.errorMessage);
    }
  };

  // Effect to run when email or password changes
  React.useEffect(() => {
    signIn;
  }, [email, password, popupState, popupText]);

  // Inside your handleLogin function
  function handleLogin() {
    setLoading(true);

    if (!email || !password) {
      // Check if email or password is missing
      setLoading(false);
      setPopupState(true);
      setPopupText("Email and/or password is missing.");
      // console.error("Email and/or password is missing.");
      return;
    }

    // Improve this code below to work with uncaught promise errors

    signIn(userData)
      .then((response) => {
        setLoading(false);

        if (response && response.data) {
          navigation.reset({
            index: 0,
            routes: [{ name: "General" }],
          });
        } else {
          setLoading(false);
          setPopupState(true);
          setPopupText("Email and/or password is incorrect.");
          // console.error("Email and/or password is incorrect.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setPopupState(true);
        setPopupText(error.response.data.errorMessage);
      });
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
          autoComplete="email"
          onSubmit={(value) => setEmail(value.nativeEvent.text)}
          placeHolder="Email"
        />
        <InputBox
          autoComplete="password"
          onSubmit={(value) => setPassword(value.nativeEvent.text)}
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
