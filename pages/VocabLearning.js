import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from "@env";
import axios from "axios";

const getVocabWords = async () => {
  const data = {
    grade: "grade8",
    field: "common_words", 
  };

  try {
    const response = await axios.post(
      `http://localhost:8080/api/get/gradeVocabField`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": APP_ENV_PRAKTYK_API_KEY,
        },
      }
    );

    if (response && response.data) {
      console.log(response.data);
      return response.data; // Update the wordList state
    } else {
      console.error("Error: No response data from the server.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export default function VocabLearning(props) {
  const navigation = useNavigation();
  const [vocab, setVocab] = useState("Initial Vocabulary");
  const [imageSource, setImageSource] = useState("https://picsum.photos/700");
  const [wordList, setWordList] = useState([]);

  const handleTranslateClick = () => {
    setVocab("Translated Vocabulary");
    setImageSource("https://picsum.photos/700");
    getVocabWords(); // Call the function to fetch words
  };

  const handlePrevClick = () => {
    // Handle previous logic here
  };

  const handleNextClick = () => {
    // Handle next logic here
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageSource }}
        style={styles.image}
      />

      <Text style={styles.vocabText}>{vocab}</Text>

      <TouchableOpacity
        style={styles.translateButton}
        onPress={handleTranslateClick}
      >
        <Text style={styles.translateButtonText}>Translate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButtonPrev}
        onPress={handlePrevClick}
      >
        <Text style={styles.arrowTextPrev}>{"<---"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButtonNext}
        onPress={handleNextClick}
      >
        <Text style={styles.arrowTextNext}>{"--->"}</Text>
      </TouchableOpacity>

      {/* <View style={styles.wordListContainer}>
        {wordList.map((word, index) => (
          <Text key={index} style={styles.wordItem}>
            {word}
          </Text>
        ))}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // ... your existing styles
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 10,
    padding: 10,
  },
  translateButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "blue", // Customize the background color for the Translate button
    borderRadius: 5, // Add some border radius to the button
  },
  vocabText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  arrowButtonPrev: {
    position: "absolute",
    bottom: 10, // Adjust as needed
    left: 10, // Adjust as needed
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  arrowButtonNext: {
    position: "absolute",
    bottom: 10, // Adjust as needed
    right: 10, // Adjust as needed
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  arrowTextPrev: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowTextNext: {
    fontSize: 18,
    fontWeight: "bold",
  },
  translateButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  wordListContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  wordItem: {
    fontSize: 16,
    marginVertical: 5,
  },
});
