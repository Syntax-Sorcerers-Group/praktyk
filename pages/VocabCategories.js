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

  const catergoryField = "common_words";

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>VOCAB Categories</Text>
      <Text>Selected Grade: {selectedGrade}</Text>
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
  );
}
