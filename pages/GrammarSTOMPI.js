import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DuoDragDrop, {
  DuoDragDropRef,
  Word,
  Placeholder,
  Lines,
} from "@jamsch/react-native-duo-drag-drop";
import { withSpring, withTiming } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";

export default function GrammarSTOMPI(props) {
  const DuoDragDropRef = useRef();
  const [gesturesDisabled, setGesturesDisabled] = useState(false);
  const [answeredWords, setAnsweredWords] = useState([]);
  const [log, setLog] = useState([]);
  const [rtl, setRtl] = useState(false);
  const [isGraded, setIsGraded] = useState(false); // Track if the grading button has been pressed.

  // Orginal words
  const originalWords = ["Die", "seun", "skop", "die", "bal"];

  // Shuffle the words
  const shuffledWords = ["seun", "Die", "die", "skop", "bal"];

  const [gradeWords, setGradeWords] = useState(
    Array(originalWords.length).fill(true)
  );

  const words = [...originalWords]; // Copy of the original words to track the final positions.

  const calculateGrade = () => {
    // Calculate the grade of the drag and drop activity.
    // Compare the original words to the answered words.
    // If the words are in the same order, the grade is correct.
    // Otherwise, the grade is incorrect.
    const answered = DuoDragDropRef.current?.getAnsweredWords() || [];
    const grade = [];
    for (let i = 0; i < originalWords.length; i++) {
      grade.push(originalWords[i] === answered[i]);
    }

    // Check if all words are answered
    if (answered.length !== originalWords.length) {
      // Display a warning to place all words
      alert("Please place all the words before grading.");
      return;
    }

    setIsGraded(true);
    setGradeWords(grade);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ margin: 20, minHeight: 300 }}>
        <DuoDragDrop
          ref={DuoDragDropRef}
          words={shuffledWords}
          wordHeight={40}
          lineHeight={49}
          wordGap={4}
          gesturesDisabled={gesturesDisabled}
          rtl={rtl}
          wordBankOffsetY={10}
          wordBankAlignment="center"
          extraData={gradeWords}
          onDrop={(ev) => {
            const { destination, index, position } = ev;
            setLog((l) => [
              ...l,
              `[onDrop] Dropped word '${words[index]}' on '${destination}' at position ${position}`,
            ]);
          }}
          renderWord={(_word, index) => (
            <Word
              containerStyle={{
                backgroundColor: isGraded
                  ? gradeWords[index]
                    ? "green"
                    : "red"
                  : "transparent",
                borderColor: isGraded
                  ? gradeWords[index]
                    ? "green"
                    : "red"
                  : "#CCC",
              }}
              textStyle={{
                color: isGraded
                  ? gradeWords[index]
                    ? "white"
                    : "black"
                  : "black",
              }}
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
      <Button
        title="Get words"
        onPress={() => {
          const answered = DuoDragDropRef.current?.getAnsweredWords() || [];
          setAnsweredWords(answered);
          calculateGrade();
        }}
      />
      <Button
        title={`Gestures disabled: ${gesturesDisabled}`}
        onPress={() => setGesturesDisabled((s) => !s)}
      />
      <View style={styles.logContainer}>
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
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  logContainer: {
    height: 130,
    padding: 5,
  },
  debugLogText: {
    fontWeight: "500",
  },
});
