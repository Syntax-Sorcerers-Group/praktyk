import * as React from 'react';
import { Avatar } from 'react-native-paper';

const ImageDisplay = (props) => {
    const { imgSource, imgSize } = props;

    return (
        <Avatar.Image 
          size={imgSize} 
          source={imgSource} 
        />
    );
}

export default ImageDisplay