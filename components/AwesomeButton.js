import * as React from "react";
import AwesomeButton from "react-native-really-awesome-button";

const AwesomeButtonComponent = (props) => {
  const {
    displayText,
    icon,
    mode,
    onPress,
    loadingState,
    isDisabled,
    width,
    activeOpacity,
    textFontFamily,
    textSize,
  } = props;
  return (
    <AwesomeButton
      icon={icon}
      mode={mode}
      onPress={onPress}
      loading={loadingState}
      disabled={isDisabled}
      width={width}
      borderRadius={30}
      height={40}
      borderColor="black"
      backgroundColor="#0191d0"
      backgroundDarker="#026e9e"
      //backgroundShadow="white"
      backgroundActive="#00b1ff"
      textColor="white"
      textSize={textSize}
      activeOpacity={activeOpacity}
    >
      {displayText}
    </AwesomeButton>
  );
};

export default AwesomeButtonComponent;
