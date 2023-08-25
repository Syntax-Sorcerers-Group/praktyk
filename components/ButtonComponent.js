import * as React from 'react';
import { Button } from 'react-native-paper';

const ButtonComponent = (props) => {
    const { displayText, icon, mode, onPress } = props;
    return (
        <Button 
            icon={icon} 
            mode={mode} 
            onPress={onPress}>
            {displayText}
        </Button>
    );
}

export default ButtonComponent;