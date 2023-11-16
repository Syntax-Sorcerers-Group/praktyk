import * as React from "react";
import AwesomeButton from "react-native-really-awesome-button";

const AwesomeButtonComponent = (props) => {
  const { displayText, icon, mode, onPress, loadingState, isDisabled,width,activeOpacity,textFontFamily,textSize } = props;
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
      borderColor= "black"
      backgroundColor="#dcbfff"
      backgroundDarker="#a265d5"
      //backgroundShadow="white"
      backgroundActive="#d0a2f7"
      textColor="white"
      textSize={textSize}
      activeOpacity={activeOpacity}
    >
      {displayText}
    </AwesomeButton>
  );
};

export default AwesomeButtonComponent;