import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native"; // Import KeyboardAvoidingView and Platform
import { useNavigation } from "@react-navigation/native";
import dsc from "dice-similarity-coeff";
import * as Progress from "react-native-progress";
import InputBox from "../components/InputBox";

export default function GrammarLearning(props) {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState(""); // State to store the input text
  const [similarityResult, setSimilarityResult] = useState(0); // State to store the similarity result
  const [message, setMessage] = useState(""); // State to store the message

  // Function to calculate similarity and update the state
  const calculateSimilarity = (text) => {
    if (typeof text === "string") {
      const similarity = dsc.twoStrings(text, "this was a sentence");
      setSimilarityResult(similarity);
      setMessage(getMessage(similarity * 100));
    } else {
      // Handle the case when text is not a string (e.g., it's undefined or not a string)
      setSimilarityResult(0); // You can set a default value or handle it as per your requirements
    }
  };

  // Function to handle text input changes
  const handleInputChange = (event) => {
    const text = event.nativeEvent.text; // Extract the entered text from the event
    setInputText(text); // Update the inputText state
    calculateSimilarity(text); // Calculate similarity as the user types
  };

  // Function to get a message based on the similarity result
  const getMessage = (result) => {
    if (result >= 0 && result < 30) {
      return "Wrong!";
    } else if (result >= 30 && result < 60) {
      return "Getting there!";
    } else if (result >= 60 && result < 80) {
      return "You got this!";
    } else if (result >= 80 && result < 100) {
      return "You are so close!";
    } else if (result === 100) {
      return "Correct!";
    } else {
      return ""; // Handle other cases as needed
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on platform
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100} // Customize vertical offset as needed
    >
      <Text
        style={{
          margin: 20,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Convert the following to past tense
      </Text>

      <Text
        style={{
          margin: 20,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        "This is a sentence"
      </Text>

      <InputBox
        onChange={handleInputChange}
        placeholder="Type here"
        value={inputText} // Bind the input value to the state
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{message}</Text>
      <Progress.Bar progress={similarityResult} width={200} />
    </KeyboardAvoidingView>
  );
}
