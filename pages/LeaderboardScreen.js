import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from "@env";
import axios from "axios";
//For Loading Screen
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
//Async Function that fetches leaderboard data based on gradeNo
async function fetchLeaderboardData(gradeNo) {
  try {
    const response = await axios.post(
      `${APP_ENV_PRAKTYK_API_LINK}/api/get/gradeLeaderboard`,
      {
        grade: "grade" + gradeNo, // Pass the grade as a parameter
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": APP_ENV_PRAKTYK_API_KEY,
        },
      }
    );

    if (response && response.data) {
      return response.data; // Assuming the API response is in the expected format
    } else {
      console.log("Error: No response data from the server.");
    }
  } catch (error) {
    console.error("Error:", error.message);
    // You can log more error details if needed: error.response, error.request, etc.
  }
}

const LeaderboardScreen = () => {
  //Use state for leaderboard data , empty at start
  const [leaderboardData, setLeaderboardData] = useState([]);

  const [sortOrder, setSortOrder] = useState("desc");
  const [sortGrammar, setSortGrammar] = useState("desc");
  const [sortVocab, setSortVocab] = useState("desc");
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  // THIS CODE IS FOR GETTING THE GRADE AND CATEGORY PASSED FROM THE PREVIOUS SCREEN
  const route = useRoute();

  // Retrieve the selectedGrade parameter from the route
  const selectedGrade = route.params?.selectedGrade || "Not Selected";

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    const sortedData = [...leaderboardData].sort((a, b) => {
      if (newOrder === "asc") {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });

    setLeaderboardData(sortedData);
  };

  const toggleSortGrammar = () => {
    const newOrder = sortGrammar === "asc" ? "desc" : "asc";
    setSortGrammar(newOrder);

    const sortedData = [...leaderboardData].sort((a, b) => {
      if (newOrder === "asc") {
        return a.grammarScore - b.grammarScore;
      } else {
        return b.grammarScore - a.grammarScore;
      }
    });

    setLeaderboardData(sortedData);
  };

  const toggleSortVocab = () => {
    const newOrder = sortVocab === "asc" ? "desc" : "asc";
    setSortVocab(newOrder);

    const sortedData = [...leaderboardData].sort((a, b) => {
      if (newOrder === "asc") {
        return a.vocabScore - b.vocabScore;
      } else {
        return b.vocabScore - a.vocabScore;
      }
    });

    setLeaderboardData(sortedData);
  };

  /* function that calls async fetch leaderboard data function
*It formats and sets the data to the leaderboard.

*/
  // const fetchData = async () => {
  //   try {

  //     const data = await fetchLeaderboardData(selectedGrade); // Replace with the desired grade
  //     const formattedData = data.map((item, index) => ({
  //       id: index + 1,
  //       firstName: item.username, // Assuming `username` contains the first name
  //       score: item.vocabScore + item.grammarScore,
  //       grammarScore: item.grammarScore,
  //       vocabScore: item.vocabScore,
  //     }));
  //     setLeaderboardData(formattedData);
  //     setIsLoading(false); // Mark loading as complete
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const data = await fetchLeaderboardData(selectedGrade); // Replace with the desired grade

      // Sort the data in descending order of total score
      const sortedData = data.sort(
        (a, b) =>
          b.vocabScore + b.grammarScore - (a.vocabScore + a.grammarScore)
      );

      const formattedData = sortedData.map((item, index) => ({
        id: index + 1,
        username: item.username, // Assuming `username` contains the first name
        score: item.vocabScore + item.grammarScore,
        grammarScore: item.grammarScore,
        vocabScore: item.vocabScore,
      }));

      setLeaderboardData(formattedData);
      setIsLoading(false); // Mark loading as complete
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Use effect that calls fetch data
  useEffect(() => {
    fetchData();
  }, []);

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
        <View style={styles.container}>
          <Text style={styles.title}>Leaderboard</Text>

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleSortOrder}
          >
            <Text>
              Toggle Sort ({sortOrder === "asc" ? "Ascending" : "Descending"})
              by Total Score
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleSortGrammar}
          >
            <Text>
              Grammar Score (
              {sortGrammar === "asc" ? "Ascending" : "Descending"})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleSortVocab}
          >
            <Text>
              Vocab Score ({sortVocab === "asc" ? "Ascending" : "Descending"})
            </Text>
          </TouchableOpacity>

          <View style={styles.headerRow}>
            <Text style={[styles.header, styles.column]}>Position</Text>
            <Text style={[styles.header, styles.column]}>Username</Text>
            <Text style={[styles.header, styles.column]}>Grammer Score</Text>
            <Text style={[styles.header, styles.column]}>Vocab Score</Text>
            <Text style={[styles.header, styles.column]}>Score</Text>
          </View>

          {leaderboardData.map((entry) => (
            <View key={entry.id} style={styles.row}>
              <Text style={[styles.position, styles.column]}>{entry.id}</Text>
              <Text style={[styles.name, styles.column]}>
                {entry.username}
              </Text>
              <Text style={[styles.score, styles.column]}>
                {entry.grammarScore}
              </Text>
              <Text style={[styles.score, styles.column]}>
                {entry.vocabScore}
              </Text>
              <Text style={[styles.score, styles.column]}>{entry.score}</Text>
            </View>
          ))}
        </View>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  toggleButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
  },
  position: {
    fontSize: 18,
  },
  name: {
    fontSize: 18,
  },
  score: {
    fontSize: 18,
  },
  column: {
    width: "16.66%", // Each column takes up 1/6 of the width
  },
});

export default LeaderboardScreen;
