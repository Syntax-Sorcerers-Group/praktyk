import React from "react";
import { View, Text, StyleSheet, Button, ScrollView  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomCard from "../components/CustomCards";

export default function LiteratureCategories({ navigation }) {
  // Retrieve the selectedGrade parameter from the route
  // const selectedGrade = route.params?.selectedGrade || "Not Selected";
  const selectedGrade = 12;

  const catergoryField = "set_literature";

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text style={{ fontSize: 26, fontWeight: "bold" }}>
//         Literature Categories
//       </Text>
//       <Button
//         title="Literature Learning"
//         onPress={() => {
//           navigation.navigate("Literature Learning", {
//             selectedGrade,
//             catergoryField,
//           }); // Pass selectedGrade as a parameter
//         }}
//       />
//     </View>
//   );
// }

return (
  <ScrollView>
    <CustomCard
      title="Fiela se Kind"
      imageUrl="https://cdn.24.co.za/files/Cms/General/d/9220/86b498b6f3b041f9a09cd3ba328008bc.jpg"
        onPress={() => {
          navigation.navigate("Literature Learning", {
            selectedGrade,
            catergoryField,
          }); // Pass selectedGrade as a parameter
        }}
    />
  </ScrollView>
);
}
