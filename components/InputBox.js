import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const InputBox = (props) => {
  const { autoComplete, placeHolder, onSubmit, icon } = props;
  const [text, setText] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const handleIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={placeHolder}
        value={text}
        onChange={onSubmit}
        onChangeText={text => setText(text)}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry && autoComplete === "password" ? true : false}
        right={icon ? 
          <TextInput.Icon 
            icon={icon} 
            onPress={handleIconPress}
          /> 
          : null
        }
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