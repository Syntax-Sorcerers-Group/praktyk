import React, { useState, useEffect } from "react";
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

export default function VocabLearning(props) {
  const navigation = useNavigation();
  const [afrikaansWord, setAfrikaansWord] = useState("Afrikaans Word");
  const [englishWord, setEnglishWord] = useState("English Word");
  const [imageSource, setImageSource] = useState("https://picsum.photos/700");
  const [wordList, setWordList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);

  useEffect(() => {
    async function fetchVocabWords() {
      const data = {
        grade: "grade8",
        field: "common_words",
      };

      try {
        const response = await axios.post(
          `${APP_ENV_PRAKTYK_API_LINK}/api/get/gradeVocabField`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": APP_ENV_PRAKTYK_API_KEY,
            },
          }
        );

        if (response && response.data && response.data.common_words) {
          const commonWords = response.data.common_words;
          const wordPairs = [];

          for (const englishWord in commonWords) {
            if (commonWords.hasOwnProperty(englishWord)) {
              const afrikaansWord = commonWords[englishWord];
              wordPairs.push({ english: englishWord, afrikaans: afrikaansWord });
            }
          }

          setWordList(wordPairs);
        } else {
          console.error("Error: No common_words data in the response.");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    fetchVocabWords();
  }, []);

  const handleTranslateClick = () => {
    if (showEnglish) {
      setShowEnglish(false);
    } else {
      setShowEnglish(true);
      setEnglishWord(wordList[currentIndex].english);
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : 0));
    setShowEnglish(false);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < wordList.length ? prevIndex + 1 : 0
    );
    setShowEnglish(false);
    setAfrikaansWord(wordList[currentIndex].afrikaans);
  };

  useEffect(() => {
    if (wordList.length > 0) {
      const currentAfrikaansWord = wordList[currentIndex].afrikaans;
      setAfrikaansWord(currentAfrikaansWord);
    }
  }, [currentIndex, wordList]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />

      

      <View style={styles.wordContainer}>
      <Text style={styles.afrikaansText}>{afrikaansWord}</Text>
      {showEnglish && (
        <Text style={styles.space}> : </Text> // Add a space character
      )}
      {showEnglish && (
        <Text style={styles.englishText}>{englishWord}</Text>
      )}
    </View>




      <TouchableOpacity style={styles.translateButton} onPress={handleTranslateClick}>
        <Text style={styles.translateButtonText}>
          {showEnglish ? "Hide English" : "Translate"}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.arrowButtonPrev} onPress={handlePrevClick}>
          <Text style={styles.arrowTextPrev}>{"<---"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.arrowButtonNext} onPress={handleNextClick}>
          <Text style={styles.arrowTextNext}>{"--->"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  space: {
    fontSize: 20,
    fontWeight: "bold",
  },

  afrikaansText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  englishText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  translateButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  arrowButtonPrev: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  arrowButtonNext: {
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
