import React from "react";
import { View, StyleSheet, ScrollView} from "react-native";
import { useNavigation } from '@react-navigation/native';
import InputBox from "../components/InputBox";
import Button from "../components/ButtonComponent";
import Popup from "../components/Popup";

export default function LoginScreen(props) {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [popup, setPopup] = React.useState(false);

  function handleLogin() {
    console.log(email, password);

    if (email === "" || password === "") {
      setPopup(true);
      return;
    } else {
      setPopup(false);
    }
    
    navigation.reset({
      index: 0, // Reset the stack index to 0
      routes: [{ name: 'General' }], // Navigate to the Home screen
    });
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
            autoComplete="password"
            placeHolder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            displayText="Login"
            icon="login"
            mode="elevated"
            onPress={() => handleLogin()}
          />
          {/* <Popup 
            visible={popup} 
            displayText="Invalid email or password" 
          /> */}
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