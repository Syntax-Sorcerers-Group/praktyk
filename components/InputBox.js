import * as React from "react";
import { TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const InputBox = (props) => {
  const { autoComplete, placeHolder, onChange, icon, isDisabled, testID } = props;
  const [text, setText] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const handleIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <TextInput
        testID={testID}
        mode="outlined"
        label={placeHolder}
        value={text}
        disabled={isDisabled}
        onChange={onChange}
        onChangeText={(text) => setText(text)}
        autoComplete={autoComplete}
        secureTextEntry={
          secureTextEntry && autoComplete === "password" ? true : false
        }
        right={
          icon ? <TextInput.Icon testID="icon" icon={icon} onPress={handleIconPress} /> : null
        }
        returnKeyType="done" // Add this line to set the returnKeyType
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
  },
});

export default InputBox;
