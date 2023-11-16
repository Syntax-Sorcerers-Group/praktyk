import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Table = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.username}</Text>
      <Text style={styles.cell}>{item.grammarScore}</Text>
      <Text style={styles.cell}>{item.vocabScore}</Text>
      <Text style={styles.cell}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>No.</Text>
        <Text style={styles.headerText}>Username</Text>
        <Text style={styles.headerText}>Grammar</Text>
        <Text style={styles.headerText}>Vocab</Text>
        <Text style={styles.headerText}>Total</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    padding: 10,
    backgroundColor: '#eee',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    // flex: 1, // Remove this line
    width: '20%', // Add this line
    textAlign: 'center',
    borderRightWidth: 1, // Add this line
    borderRightColor: '#ccc', // Add this line
  },
});

export default Table;
