import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PaperProvider, Snackbar, Portal } from 'react-native-paper';

const Popup = (props) => {
  const { state, setState, labelText, displayText, timeout } = props;

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Portal>
          <Snackbar
            visible={state}
            duration={timeout}
            onDismiss={() => setState(false)}
            action={{
              label: labelText,
              onPress: () => setState(false),
            }}
            style={{ bottom: 100 }} // Adjust the bottom value as needed
          >
            {displayText}
          </Snackbar>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Popup;
