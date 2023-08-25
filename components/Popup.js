import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { PaperProvider, Snackbar, Portal } from 'react-native-paper';

const Popup = (props) => {
    const { visible, displayText } = props;
  const [visibility, setVisibility] = React.useState(visible);

//   const onToggleSnackBar = () => setVisible(!visible);

  return (
    <PaperProvider>
        <View style={styles.container}>
            <Portal>
                <Snackbar
                  visible={visible}
                  duration={100}
                //   onDismiss={() => {setVisibility(false)}}
                //   action={{
                //     label: 'Ok',
                //     onPress: () => {setVisibility(false)}
                //   }}
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