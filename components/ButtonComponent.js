import * as React from "react";
import { Button } from "react-native-paper";

const ButtonComponent = (props) => {
  const { displayText, icon, mode, onPress, loadingState, isDisabled } = props;
  return (
    <Button
      icon={icon}
      mode={mode}
      onPress={onPress}
      loading={loadingState}
      disabled={isDisabled}
      buttonColor = "white"
      textColor = "#0191d0"
    >
      {displayText}
    </Button>
  );
};

export default ButtonComponent;
