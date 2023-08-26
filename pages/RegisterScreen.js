import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import InputBox from "../components/InputBox";
import Button from "../components/ButtonComponent";
import Popup from "../components/Popup";
import Imagebox from "../components/ImageDisplay";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from '@env';

const signUp = async (userData) => {
  try {
    const response = await fetch(`${APP_ENV_PRAKTYK_API_LINK}/api/post/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_ENV_PRAKTYK_API_KEY,
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

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

    function handleRegister() {
      setLoading(true);
      if ((password === "" || confirmPassword === "") || (password !== confirmPassword)) {
        setPopupState(true);
        setPopupText("Passwords do not match");
      } else {
        signUp(userData)
        .then(responseData => {
          setLoading(false);
          const responseType = Object.keys(responseData)[0];
        
          if (responseType === "error") {
            setPopupState(true);
            setPopupText(Object.values(responseData)[2]);
          } else {
            navigation.navigate("Login");
          }
        }).catch(error => {
          console.error(error);
        });
      }
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            placeHolder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            autoComplete="password"
            placeHolder="Password"
            onChange={(e) => setPassword(e.target.value)}
            icon="eye"
          />
          <InputBox
            autoComplete="password"
            placeHolder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon="eye"
          />
          <Button
            displayText="Register"
            icon="login"
            mode="elevated"
            onPress={() => handleRegister()}
            loadingState={loading}
          />
          <Popup 
          state={popupState} 
          displayText={popupText}
          labelText="Ok"
          setState={() => {setPopupState(false)}}
          timeout={3000}
          />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 150, 
    alignSelf: 'center',
    justifyContent: 'center',  
    
  },
  image: {
    alignSelf: 'center',
    justifyContent: 'center',     
  },
  components: {
    paddingTop: 50,
    gap: 20,
  }
});