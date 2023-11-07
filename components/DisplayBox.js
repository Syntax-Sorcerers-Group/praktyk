import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const DisplayBox = (props) => {
  const { label, value, isDisabled, testID } = props;

  return (
    <View style={styles.container}>
      <TextInput
        testID={testID}
        mode="outlined"
        label={label}
        value={value}
        disabled={isDisabled !== undefined ? isDisabled : true} // Disabled by default
        // No onChangeText since we don't want to change the value
        // Add any other props that you may need
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
  },
});

export default DisplayBox;
