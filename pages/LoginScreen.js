import React from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputBox from "../components/InputBox";
import Button from "../components/ButtonComponent";
import Popup from "../components/Popup";
import Imagebox from "../components/ImageDisplay";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from "@env";
import axios from "axios";

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

    return response.data;
  } catch (error) {
    console.error("Error signing in:", error.response.data);
    throw error; // Re-throw the error to propagate it
  }
};

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

  // Usage example
  const userData = {
    email: email,
    password: password,
  };

  // Effect to run when email or password changes
  React.useEffect(() => {
    console.log("Email and/or password changed:", email, password);
    // You can add any additional logic here that needs to run
    // when the email or password changes.
  }, [email, password]);

  // Inside your handleLogin function
  function handleLogin() {
    setLoading(true);

    if (!email || !password) {
      // Check if email or password is missing
      setLoading(false);
      console.error("Email and/or password is missing.");
      return;
    }

    signIn(userData)
      .then((responseData) => {
        setLoading(false);

        const responseType = Object.keys(responseData)[0];

        if (responseType === "error") {
          setPopupState(true);
          setPopupText(Object.values(responseData)[2]);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "General" }],
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("An error occurred during login:", error);
        // Handle the error, show an error message, or take appropriate action
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
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
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
