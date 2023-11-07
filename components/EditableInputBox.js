import React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const EditableInputBox = ({ label, value, onChangeText, isDisabled, testID }) => {
  return (
    <View style={styles.container}>
      <TextInput
        testID={testID}
        mode="outlined"
        label={label}
        value={value}
        disabled={isDisabled}
        onChangeText={onChangeText}
        // You might want to specify other props such as keyboardType, autoCapitalize, etc.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
  },
});

export default EditableInputBox;
