import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import InputBox from "../components/InputBox";
import Button from "../components/ButtonComponent";

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    function handleRegister() {
        console.log(email, username, password, confirmPassword);
        navigation.navigate("Login");
    }

    return (
      <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.components}>
            <InputBox 
              autoComplete="email" 
              placeHolder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBox
              placeHolder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputBox
              autoComplete="password"
              placeHolder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputBox
              placeHolder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              displayText="Register"
              icon="login"
              mode="elevated"
              onPress={() => handleRegister()}
            />
          </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
      flex: 1,
      paddingHorizontal: 20,
      // alignItems: 'center',
      justifyContent: 'center',
    },
    components: {
      gap: 20,
      // marginTop: 20
    }
  });