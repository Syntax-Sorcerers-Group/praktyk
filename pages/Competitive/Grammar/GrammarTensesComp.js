import React, { useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native"; // Import KeyboardAvoidingView and Platform
import dsc from "dice-similarity-coeff";
import * as Progress from "react-native-progress";
import InputBox from "../../../components/InputBox";
import axios from "axios";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from "@env";
import Button from "../../../components/ButtonComponent";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to calculate similarity and update the state
function calculateSimilarity(
  text,
  setSimilarityResult,
  setMessage,
  answer,
  setLocalScore
) {
  if (typeof text === "string") {
    const similarity = dsc.twoStrings(text, answer);
    setSimilarityResult(similarity);
    setMessage(getMessage(similarity * 100));

    // Update the score based on the similarity
    let result = similarity * 100;

    if (result >= 0 && result < 30) {
      setLocalScore(0);
    } else if (result >= 30 && result < 60) {
      setLocalScore(1);
    } else if (result >= 60 && result < 80) {
      setLocalScore(2);
    } else if (result >= 80 && result < 100) {
      setLocalScore(3);
    } else if (result === 100) {
      setLocalScore(4);
    }
  } else {
    // Handle the case when text is not a string (e.g., it's undefined or not a string)
    setSimilarityResult(0); // You can set a default value or handle it as per your requirements
  }
}

// Function to get a message based on the similarity result
function getMessage(result) {
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
}

async function getSentences(userGrade) {
  const data = {
    grade: "grade" + userGrade,
  };

  try {
    const response = await axios.post(
      `${APP_ENV_PRAKTYK_API_LINK}/api/get/gradeGrammar`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": APP_ENV_PRAKTYK_API_KEY,
        },
      }
    );

    if (response && response.data) {
      const json = response.data;

      // Get the "present" sentences from the JSON response
      const present = json.present;

      // Get the "past" sentences from the JSON response
      const past = json.past;

      // Get the "future" sentences from the JSON response
      const future = json.future;

      // Return the sentences
      return { present, past, future };
    } else {
      console.log("Error: No response data from the server.");
    }
  } catch (error) {
    console.log(error);
  }
}

function chooseQuestion(present, past, future) {
  // Get the length of the sentences
  const arrayLength = present.length;

  // Generate a random number between 0 and arrayLength - 1
  const randomIndex = Math.floor(Math.random() * arrayLength);

  // Randomly choose between 0, 1, and 2
  const questionTense = Math.floor(Math.random() * 3);

  let answerTense = null;

  // Randomly choose between 0, 1 and 2 while not equal to randomTense
  while (true) {
    answerTense = Math.floor(Math.random() * 3);
    if (answerTense !== questionTense) {
      break;
    }
  }

  // Get the question and answer based on the case
  let question = null;
  let answer = null;
  let tense = null;

  switch (questionTense) {
    case 0:
      question = present[randomIndex];
      break;
    case 1:
      question = past[randomIndex];
      break;
    case 2:
      question = future[randomIndex];
      break;
    default:
      break;
  }

  switch (answerTense) {
    case 0:
      answer = present[randomIndex];
      tense = "present";
      break;
    case 1:
      answer = past[randomIndex];
      tense = "past";
      break;
    case 2:
      answer = future[randomIndex];
      tense = "future";
      break;
    default:
      break;
  }

  // Return the question and answer
  return { question, answer, tense };
}

function updateScore(
  username,
  userGrade,
  score,
  setScore,
  localScore,
  prevScore
) {
  // Update the score
  let scoreF = score + localScore + prevScore;

  // Update the score in the state
  setScore(scoreF);

  const data = {
    username: username,
    grade: "grade" + userGrade,
    vocabChange: 0,
    grammarChange: scoreF,
  };

  // Now just post the data to api/post/updateUserScores
  axios
    .post(`${APP_ENV_PRAKTYK_API_LINK}/api/post/updateUserScores`, data, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": APP_ENV_PRAKTYK_API_KEY,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default function GrammarTensesComp(props) {
  const [inputText, setInputText] = useState(""); // State to store the input text
  const [similarityResult, setSimilarityResult] = useState(0); // State to store the similarity result
  const [message, setMessage] = useState(""); // State to store the message
  const [presentSentences, setPresentSentences] = useState([]); // State to store the present sentences
  const [pastSentences, setPastSentences] = useState([]); // State to store the past sentences
  const [futureSentences, setFutureSentences] = useState([]); // State to store the future sentences
  const [UITense, setUITense] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [sentencesFetched, setSentencesFetched] = useState(false);
  const [score, setScore] = useState(0); // Track the score
  const [localScore, setLocalScore] = useState(-5); // Track the score
  const [prevScore, setPrevScore] = useState(0); // Track the score
  const [isDisabled, setIsDisabled] = useState(true); // Track the button disabled state
  const [username, setUsername] = useState(""); // State to store the username

  // Get the score from the route params
  const route = useRoute();
  // Retrieve the selectedGrade parameter from the route
  const selectedGrade = route.params?.selectedGrade || "Not Selected";
  const navigation = useNavigation();

  //Random page generator
  const grammarPages = ["Tenses Comp", "STOMPI Comp", "Negative Form Comp"];

  const getRandomPage = () => {
    const randomIndex = Math.floor(Math.random() * grammarPages.length);
    return grammarPages[randomIndex];
  };

  // Function to handle text input changes
  const handleInputChange = (event) => {
    const text = event.nativeEvent.text; // Extract the entered text from the event
    setInputText(text); // Update the inputText state
    calculateSimilarity(
      text,
      setSimilarityResult,
      setMessage,
      currentAnswer,
      setLocalScore
    ); // Calculate similarity as the user types
  };

  const handleClearInput = () => {
    setInputText(""); // Clear the inputText state
  };

  const getSentencesFromServer = async () => {
    const { present, past, future } = await getSentences(selectedGrade); // Get the sentences from the server
    setPresentSentences(present); // Update the presentSentences state
    setPastSentences(past); // Update the pastSentences state
    setFutureSentences(future); // Update the futureSentences state
    setSentencesFetched(true); // Set the flag to indicate that sentences have been fetched
  };

  // Call the getSentencesFromServer function when the component loads
  React.useEffect(() => {
    getSentencesFromServer();
  }, []);

  React.useEffect(() => {
    if (sentencesFetched) {
      // Choose a question only after sentences have been fetched
      const { question, answer, tense } = chooseQuestion(
        presentSentences,
        pastSentences,
        futureSentences
      );

      // Set the current question and answer
      setCurrentQuestion(question);
      setCurrentAnswer(answer);
      setUITense(tense);
    }
  }, [sentencesFetched]);

  // Use effect to set the score when the component loads
  React.useEffect(() => {
    const getUsernameFromStorage = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
          console.log("Username:", storedUsername);
        } else {
          console.log("Username not found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error retrieving username:", error);
      }
    };

    getUsernameFromStorage();

    setIsDisabled(true); // Disable the button

    let prevScoreL = route.params?.prevScore || 0;

    // Print the score
    console.log("Score Tenses:", prevScoreL);

    setPrevScore(prevScoreL);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {!sentencesFetched ? ( // Conditionally render loading indicator
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.purple700}
            size={"large"}
          />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          behavior={Platform.OS === "ios" ? "padding" : "padding"} // Adjust behavior based on platform
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100} // Customize vertical offset as needed
        >
          <Text
            style={{
              margin: 20,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              textDecorationLine: "underline", // Add this line
            }}
          >
            Convert the following to {UITense} tense
          </Text>

          <Text
            style={{
              margin: 20,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {currentQuestion}
          </Text>

          <InputBox
            onChange={handleInputChange}
            placeholder="Type here"
            isDisabled={!isDisabled}
            value={inputText} // Bind the input value to the state
          />

          {!isDisabled ? (
            <>
              <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20 }}>
                {message === "" ? "no answer entered" : message}
              </Text>
              <Progress.Bar progress={similarityResult} width={200} />
            </>
          ) : null}

          <View style={styles.buttonContainer}>
            <View style={styles.buttonContainerSubmit}>
              <Button
                displayText="Submit"
                mode="elevated"
                isDisabled={!isDisabled}
                onPress={() => {
                  setIsDisabled(false); // Disable the button
                }}
              />
            </View>
            <View style={styles.buttonContainerNext}>
              <Button
                displayText="Next"
                isDisabled={isDisabled}
                mode="elevated"
                onPress={() => {
                  // const { question, answer, tense } = chooseQuestion(
                  //   presentSentences,
                  //   pastSentences,
                  //   futureSentences
                  // );

                  // // Set the current question and answer
                  // setCurrentQuestion(question);
                  // setCurrentAnswer(answer);
                  // setUITense(tense);

                  // setSimilarityResult(0);
                  // setMessage("");
                  // handleClearInput();

                  const randomPage = getRandomPage();
                  navigation.replace(randomPage, {
                    prevScore: score + localScore + prevScore,
                    selectedGrade: selectedGrade,
                  });
                }}
              />
            </View>
            <View style={styles.buttonContainerExit}>
              <Button
                displayText="Exit"
                mode="elevated"
                onPress={() => {
                  // Update the score in the database
                  updateScore(
                    username,
                    selectedGrade,
                    score,
                    setScore,
                    localScore,
                    prevScore
                  );

                  // Add a delay of 3 seconds before navigating to the leaderboard
                  setTimeout(() => {
                    navigation.replace("Leaderboard Screen", {
                      selectedGrade: selectedGrade,
                    });
                  }, 3000); // 3000 milliseconds = 3 seconds
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 30,
    flexDirection: "column", // To display buttons in a row
    justifyContent: "space-between", // To distribute the space evenly
    maxWidth: "80%", // Limit the width of the container
    alignSelf: "center", // Center the container horizontally'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainerSubmit: {
    padding: 10,
  },
  buttonContainerNext: {
    padding: 10,
  },
  buttonContainerExit: {
    padding: 10,
  },
});
