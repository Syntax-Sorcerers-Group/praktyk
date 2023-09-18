// import React from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export default function VocabCategories({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text style={{ fontSize: 26, fontWeight: "bold" }}>VOCAB Categories</Text>
//       <Button
//         title="Vocab Learning"
//         onPress={() => {
//           navigation.navigate("Vocab Learning");
//         }}
//       />
//     </View>
//   );
// }

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function VocabCategories() {
  const navigation = useNavigation();
  const route = useRoute();

  // Retrieve the selectedGrade parameter from the route
  const selectedGrade = route.params?.selectedGrade || "Not Selected";

  const common_words = "common_words";
  const catergoryField = "common_words";
  const question_words = "question_words";
  const synonyms = "synonyms";

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>VOCAB Categories</Text>
      <Text>Selected Grade: {selectedGrade}</Text>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Vocab Learning"
          onPress={() => {
            navigation.navigate("Vocab Learning", {
              selectedGrade,
              catergoryField,
            }); // Pass selectedGrade as a parameter
          }}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Question Words"
          onPress={() => {
            navigation.navigate("Vocab Question Words", {
              selectedGrade,
              question_words,
            }); // Pass selectedGrade as a parameter
          }}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Synonyms"
          onPress={() => {
            navigation.navigate("Vocab Synonyms", {
              selectedGrade,
              synonyms,
            }); // Pass selectedGrade as a parameter
          }}
        />
      </View>
    </View>
  );  
}
