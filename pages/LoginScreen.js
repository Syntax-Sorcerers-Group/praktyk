import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputBox from "../components/InputBox";
import Button from "../components/ButtonComponent";
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

  // Modal visibility variable
  const [modalVisible, setModalVisible] = React.useState(false);

  // Error message variable
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
      setModalVisible(true);
      setPopupText(
        error.response
          ? error.response.data.errorMessage
          : "An error occurred while signing in."
      );
    }
  };

  // Inside your handleLogin function
  function handleLogin() {
    setLoading(true);

    if (!email || !password) {
      // Check if email or password is missing
      setLoading(false);
      setModalVisible(true);
      setPopupText("Email and/or password is missing.");
      return;
    }

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
          setModalVisible(true);
          setPopupText("Email and/or password is incorrect.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setModalVisible(true);
        setPopupText(
          error.response
            ? error.response.data.errorMessage
            : "An error occurred while signing in."
        );
      });
  }

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
    >
      <View style={styles.container}>
        <View style={styles.image}>
          <Imagebox
            imgSource={require("../assets/splash-screen.jpg")}
            imgSize={200}
          />
        </View>
        <View style={styles.form}>
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
          <View style={{ padding: 20 }}>
            <Button
              displayText="Login"
              icon="login"
              mode="elevated"
              onPress={() => handleLogin()}
              loadingState={loading}
            />
          </View>
        </View>
      </View>
      {/* Modal for displaying errors */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>{popupText}</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={styles.okButton}
          >
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: "70%",
  },

  okButton: {
    backgroundColor: "#007AFF", // Change to your desired button color
    marginTop: 10, // Adjust spacing as needed
    padding: 10, // Adjust padding as needed
    borderRadius: 5, // Adjust border radius as needed
    minWidth: 100, // Set a minimum width for the button
    alignItems: "center",
  },

  okButtonText: {
    color: "white", // Change to your desired text color
    fontWeight: "bold", // Apply desired text styling
  },
});
