import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      score: 1000,
      grammarScore: 90,
      vocabScore: 85,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      score: 900,
      grammarScore: 85,
      vocabScore: 88,
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      score: 800,
      grammarScore: 88,
      vocabScore: 80,
    },
    // Add more entries as needed
  ]);

  const [sortOrder, setSortOrder] = useState("desc");
  const [sortGrammar, setSortGrammar] = useState("desc");
  const [sortVocab, setSortVocab] = useState("desc");

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleSortOrder}>
        <Text>
          Toggle Sort ({sortOrder === "asc" ? "Ascending" : "Descending"}) by
          Total Score
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.toggleButton} onPress={toggleSortOrder}>
        <Text>
          Toggle Sort ({sortOrder === "asc" ? "Ascending" : "Descending"}) by Total Score
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.toggleButton} onPress={toggleSortGrammar}>
        <Text>
          Grammar Score ({sortGrammar === "asc" ? "Ascending" : "Descending"})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleSortVocab}>
          <Text>
            Vocab Score ({sortVocab === "asc" ? "Ascending" : "Descending"})
          </Text>
        </TouchableOpacity>

      <View style={styles.headerRow}>
        <Text style={[styles.header, styles.column]}>Position</Text>
        <Text style={[styles.header, styles.column]}>First Name</Text>
        <Text style={[styles.header, styles.column]}>Last Name</Text>
        <Text style={[styles.header, styles.column]}>Grammer Score</Text>
        <Text style={[styles.header, styles.column]}>Vocab Score</Text>
        <Text style={[styles.header, styles.column]}>Score</Text>
      </View>

      {leaderboardData.map((entry, index) => (
        <View key={entry.id} style={styles.row}>
          <Text style={[styles.position, styles.column]}>{index + 1}</Text>
          <Text style={[styles.name, styles.column]}>{entry.firstName}</Text>
          <Text style={[styles.name, styles.column]}>{entry.lastName}</Text>
          <Text style={[styles.score, styles.column]}>
            {entry.grammarScore}
          </Text>
          <Text style={[styles.score, styles.column]}>{entry.vocabScore}</Text>
          <Text style={[styles.score, styles.column]}>{entry.score}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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