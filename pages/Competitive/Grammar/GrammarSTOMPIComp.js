import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DuoDragDrop, {
  Word,
  Placeholder,
  Lines,
} from "@jamsch/react-native-duo-drag-drop";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from "@env";
import axios from "axios";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import Button from "../../../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getGrammarWords(selectedGrade) {
  const data = {
    grade: "grade" + selectedGrade,
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
      const presentWords = json.present;

      // Get split each sentence into words
      var words = [];
      for (var i = 0; i < presentWords.length; i++) {
        words.push(presentWords[i].split(" "));
      }

      // Shuffle the index of the words using Fisher-Yates shuffle
      for (var i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }

      return words;
    } else {
      console.log("Error: No response data from the server.");
    }
  } catch (error) {
    console.error("Error:", error.message);
    // You can log more error details if needed: error.response, error.request, etc.
  }
}

function updateScore(
  username,
  selectedGrade,
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
    grade: "grade" + selectedGrade,
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

export default function GrammarSTOMPIComp(props) {
  const DuoDragDropRef = useRef();
  const [gesturesDisabled, setGesturesDisabled] = useState(false);
  const [answeredWords, setAnsweredWords] = useState([]);
  const [log, setLog] = useState([]);
  const [rtl, setRtl] = useState(false);
  const [isGraded, setIsGraded] = useState(false); // Track if the grading button has been pressed.
  const [serverWords, setServerWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [originalWords, setOriginalWords] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [gradeWords, setGradeWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0); // Track the score
  const [localScore, setLocalScore] = useState(0); // Track the score
  const [prevScore, setPrevScore] = useState(0); // Track the score
  const [isDisabled, setIsDisabled] = useState(true); // Track the button disabled state
  const [username, setUsername] = useState(""); // State to store the username

  // Get the score from the route params
  const route = useRoute();
  // Retrieve the selectedGrade parameter from the route
  const selectedGrade = route.params?.selectedGrade || "Not Selected";
  const navigation = useNavigation();

  // const selectedGrade = 8; // TODO: Get the user's grade from the home page instead of hardcoding it.

  //Random page generator
  const grammarPages = ["Tenses Comp", "STOMPI Comp", "Negative Form Comp"];

  const getRandomPage = () => {
    const randomIndex = Math.floor(Math.random() * grammarPages.length);
    return grammarPages[randomIndex];
  };

  // Function to shuffle an array using Fisher-Yates shuffle
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Get the words from the server
  const fetchWords = async () => {
    try {
      const swords = await getGrammarWords(selectedGrade);
      setServerWords(swords);
      setIsLoading(false); // Mark loading as complete
    } catch (error) {
      console.error("Error fetching words:", error);
      setIsLoading(false); // Mark loading as complete even on error
    }
  };

  // Use useEffect without any conditionals
  useEffect(() => {
    fetchWords();
  }, [selectedGrade]);

  useEffect(() => {
    // Orginal words
    if (serverWords.length > 0) {
      setOriginalWords(serverWords[currentIndex]);
      setShuffledWords(shuffleArray(serverWords[currentIndex])); // Shuffle the words
      setGradeWords(Array(serverWords[currentIndex].length).fill(true));
    }
  }, [serverWords]);

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
    console.log("Score STOMPI:", prevScoreL);

    setPrevScore(prevScoreL);
  }, []);

  const calculateGrade = () => {
    // Ensure that originalWords is defined before using it here
    if (originalWords.length === 0) {
      alert("Please wait for words to load.");
      return;
    }

    // Calculate the grade of the drag and drop activity.
    // Compare the original words to the answered words.
    // If the words are in the same order, the grade is correct.
    // Otherwise, the grade is incorrect.
    const answered = DuoDragDropRef.current?.getAnsweredWords() || [];
    const grade = [];
    for (let i = 0; i < originalWords.length; i++) {
      grade.push(originalWords[i] === answered[i]);
      //console.log(originalWords[i], answered[i]);
    }

    // Print the number of correctly answered words
    // console.log(
    //   "Correctly answered words:",
    //   grade.filter((word) => word).length
    // );

    setLocalScore(grade.filter((word) => word).length);

    // Check if all words are answered
    if (answered.length !== originalWords.length) {
      // Display a warning to place all words
      // alert("Please place all the words before grading.");
      return;
    }

    setShuffledWords(answered);

    setGradeWords(grade);
    setIsGraded(true);
    //console.log(grade);
  };

  const calculateWordStyles = (index) => {
    const backgroundColor = isGraded
      ? gradeWords[index]
        ? "green"
        : "red"
      : "transparent";

    const borderColor = isGraded
      ? gradeWords[index]
        ? "green"
        : "red"
      : "#CCC";

    const color = isGraded ? (gradeWords[index] ? "white" : "black") : "black";

    // console.log(`Word ${index} Styles - Background: ${backgroundColor}`);

    return { backgroundColor, borderColor, color };
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isLoading ? ( // Conditionally render loading indicator
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.purple700}
            size={"large"}
          />
        </View>
      ) : (
        // Render component content once data is available
        <View style={{ margin: 20, minHeight: 300 }}>
          <Text
            style={{
              margin: 20,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Drag and drop the words to form a sentence using STOMPI rules
          </Text>
          <View style={{ margin: 20, minHeight: 300 }}>
            <DuoDragDrop
              ref={DuoDragDropRef}
              words={shuffledWords}
              wordHeight={40}
              lineHeight={49}
              wordGap={4}
              gesturesDisabled={!isDisabled}
              rtl={rtl}
              wordBankOffsetY={10}
              wordBankAlignment="center"
              extraData={gradeWords}
              onDrop={(ev) => {
                const { destination, index, position } = ev;
                // setLog((l) => [
                //   ...l,
                //   `[onDrop] Dropped word '${words[index]}' on '${destination}' at position ${position}`,
                // ]);
              }}
              renderWord={(_word, index) => (
                <Word
                  containerStyle={calculateWordStyles(index)}
                  textStyle={calculateWordStyles(index)}
                />
              )}
              renderPlaceholder={({ style }) => (
                <Placeholder style={[style, { borderRadius: 5 }]} />
              )}
              renderLines={(props) => (
                <Lines
                  {...props}
                  containerStyle={{ backgroundColor: "transparent" }}
                  lineStyle={{ borderColor: "#CCC" }}
                />
              )}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonContainerSubmit}>
              <Button
                displayText="Submit"
                isDisabled={!isDisabled}
                mode="elevated"
                onPress={() => {
                  const answered =
                    DuoDragDropRef.current?.getAnsweredWords() || [];
                  setAnsweredWords(answered);
                  calculateGrade();
                  setIsDisabled(false);
                  // Set a timeout to update isGraded after a certain delay (e.g., 1000 milliseconds or 1 second)
                  // setTimeout(() => {
                  //   setIsGraded(true);
                  // }, 500); // Adjust the delay as needed
                  // console.log(gradeWords);
                  // console.log(answeredWords);
                }}
                style={styles.button} // Apply padding style to the button
              />
            </View>
            <View style={styles.buttonContainerNext}>
              <Button
                displayText="Next"
                isDisabled={isDisabled}
                mode="elevated"
                onPress={() => {
                  // // Increment the index
                  // setCurrentIndex(
                  //   (prevIndex) => (prevIndex + 1) % serverWords.length
                  // );

                  // // Reset the answered words
                  // setAnsweredWords([]);

                  // // Reset the grade
                  // setIsGraded(false);

                  // setOriginalWords(
                  //   serverWords[(currentIndex + 1) % serverWords.length]
                  // );
                  // setShuffledWords(
                  //   shuffleArray(
                  //     serverWords[(currentIndex + 1) % serverWords.length]
                  //   )
                  // ); // Shuffle the words
                  // setGradeWords(
                  //   Array(
                  //     serverWords[(currentIndex + 1) % serverWords.length].length
                  //   ).fill(true)
                  // );

                  const randomPage = getRandomPage();
                  navigation.replace(randomPage, {
                    prevScore: score + localScore + prevScore,
                    selectedGrade: selectedGrade,
                  });
                }}
                style={styles.button} // Apply padding style to the button
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
          {/* <Button
            title={`Gestures disabled: ${gesturesDisabled}`}
            onPress={() => setGesturesDisabled((s) => !s)}
          /> */}
          {/* <View style={styles.logContainer}>
            <Text style={styles.debugLogText}>EVENT LOG</Text>
            <Text>Original Words: {originalWords.join(", ")}</Text>
            <Text>
              Answered Words: {answeredWords ? answeredWords.join(", ") : "N/A"}
            </Text>
            <Text>
              Grade:{" "}
              {isGraded
                ? gradeWords.every((word) => word)
                  ? "Correct"
                  : "Incorrect"
                : "N/A"}
            </Text>
            <ScrollView>
              {log.map((l, i) => (
                <Text key={i}>{l}</Text>
              ))}
              {log.length === 0 && <Text>No events</Text>}
            </ScrollView>
          </View> */}
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10, // Adjust the padding as needed
  },
  buttonContainer: {
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
  logContainer: {
    height: 130,
    padding: 5,
  },
  debugLogText: {
    fontWeight: "500",
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
