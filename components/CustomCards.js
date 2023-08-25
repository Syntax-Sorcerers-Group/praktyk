// import * as React from 'react';
// import { Avatar, Button, Card, Text } from 'react-native-paper';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

// const CustomCard = ({ title, imageUrl }) => (
//   <Card>
//     <Card.Title title={title} left={LeftContent} />
//     <Card.Cover source={{ uri: imageUrl }} />
//     <Card.Actions>
//       <Button>Cancel</Button>
//       <Button>Ok</Button>
//     </Card.Actions>
//   </Card>
// );

// export default CustomCard;

import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const CustomCard = ({ title, imageUrl, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Title
          title={<Text style={styles.title}>{title}</Text>} // Apply styling to the title
          titleStyle={styles.title} // Ensure the title style is applied
        />
        <Card.Cover source={{ uri: imageUrl }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
  },
});

export default CustomCard;
