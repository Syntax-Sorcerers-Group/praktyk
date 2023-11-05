import React from 'react';
import { render } from '@testing-library/react-native';
import ImageDisplay from './ImageDisplay'; // assuming your component file is named ImageDisplay.js

describe('ImageDisplay component', () => {
  it('renders correctly with image source and size', () => {
    const imgSource = { uri: 'https://example.com/image.jpg' };
    const imgSize = 50;

    const { getByTestId } = render(<ImageDisplay imgSource={imgSource} imgSize={imgSize} />);
    const imageDisplay = getByTestId('image-display');

    expect(imageDisplay).toBeTruthy();
    expect(imageDisplay.props.size).toBe();
    expect(imageDisplay.props.source).toBe(imgSource);
  });
});

