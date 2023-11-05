import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputBox from './InputBox'; // assuming your component file is named InputBox.js

describe('InputBox component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<InputBox />);
    const inputBox = getByTestId('input-box');
    expect(inputBox).toBeTruthy();
  });

  it('handles text change', () => {
    const { getByTestId } = render(<InputBox />);
    const inputBox = getByTestId('input-box');
    fireEvent.changeText(inputBox, 'Hello');
    expect(inputBox.props.value).toBe('Hello');
  });

  it('disables input when isDisabled prop is true', () => {
    const { getByTestId } = render(<InputBox isDisabled={true} />);
    const inputBox = getByTestId('input-box');
    expect(inputBox.props.disabled).toBe();
  });
});

