import * as React from 'react';
import { Button } from 'react-native-paper';

const ButtonComponent = (props) => {
    const { displayText, icon, mode, onPress, loadingState } = props;
    return (
        <Button 
            icon={icon} 
            mode={mode} 
            onPress={onPress}
            loading={loadingState}
        >
            {displayText}
        </Button>
    );
}

export default ButtonComponent;