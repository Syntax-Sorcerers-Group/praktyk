import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function VocabLearning(props) {
  const navigation = useNavigation();
  const [vocab, setVocab] = useState("Initial Vocabulary");
  const [imageSource, setImageSource] = useState("https://picsum.photos/700"); // Initial URL

  const handleTranslateClick = () => {
    setVocab("Translated Vocabulary");
    setImageSource("https://picsum.photos/700"); // Update the URL as needed
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
        source={{ uri: imageSource }} // Use the `uri` property for the image URL
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
    </View>
  );
}

const styles = StyleSheet.create({
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
});
