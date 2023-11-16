import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from "@env";
import axios from "axios";
import Button from "../components/ButtonComponent";
//For Loading Screen
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import AwesomeButton from "../components/AwesomeButton";
import Table from "../components/Table";

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
      console.log(leaderboardData);
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
        // <ScrollView horizontal>
          <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Leaderboard</Text>
          {/* <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleSortOrder}
          >
            <Text>
              Toggle Sort ({sortOrder === "asc" ? "Ascending" : "Descending"})
              by Total Score
            </Text>
          </TouchableOpacity> */}
          <View style={styles.ButtonStyle}>
            <View style={styles.buttonContainerTotalScore}>
              <AwesomeButton
              width = {110}
                displayText={`Total Score (${
                  sortOrder === "asc" ? "ASC" : "DESC"
                })`}
                mode="elevated" // You can adjust the mode as needed
                onPress={toggleSortOrder}
              />
            </View>

            <View style={styles.buttonContainerGrammar}>
              <AwesomeButton
              width = {120}
                displayText={`Grammar Score (${
                  sortGrammar === "asc" ? "ASC" : "DESC"
                })`}
                mode="elevated" // You can adjust the mode as needed
                onPress={toggleSortGrammar}
              />
            </View>

            {/* <TouchableOpacity
              style={styles.toggleButton}
              onPress={toggleSortGrammar}
            >
              <Text>
                Grammar Score (
                {sortGrammar === "asc" ? "Ascending" : "Descending"})
              </Text>
            </TouchableOpacity> */}

            <View style={styles.buttonContainerVocab}>
              <AwesomeButton
              width = {120}
                displayText={`Vocab Score (${
                  sortVocab === "asc" ? "ASC" : "DESC"
                })`}
                mode="elevated" // You can adjust the mode as needed
                onPress={toggleSortVocab}
              />
            </View>
          </View>

          {/* <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleSortVocab}
          >
            <Text>
              Vocab Score ({sortVocab === "asc" ? "Ascending" : "Descending"})
            </Text>
          </TouchableOpacity> */}
          <Table data={leaderboardData} />
        </View> 
      </ScrollView>
      // </ScrollView>
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
  table: {  
    width: "100%",
  },
  ButtonStyle: {
    flexDirection: "row",
    marginBottom: 5,
    padding: 5,
  },
  buttonContainerTotalScore: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingLeft: 25,
  },
  buttonContainerGrammar: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  buttonContainerVocab: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingRight: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
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
    width: "100%",
  },
  header: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  position: {
    flex: 0,
    textAlign: "center",
    fontSize: 16,

    paddingVertical: 10,

  },
  name: {
    flex: 0,
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 10,
  },
  score1: {
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 10,
  },
  score2: {
    textAlign: "center",
    left: 10,
    fontSize: 16,
    paddingVertical: 10,
  },
  score3: {
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 10,
  },
  column: {
    // flex: 1,
    width: "auto", // Each column takes up 1/6 of the width
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1, // Add a border
    borderColor: '#ddd', // Border color
  },
});

export default LeaderboardScreen;
