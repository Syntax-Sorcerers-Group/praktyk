import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ButtonComponent from './ButtonComponent'; // assuming your component file is named ButtonComponent.js

describe('ButtonComponent', () => {
  const mockDisplayText = 'Click me';
  const mockIcon = 'star';
  const mockMode = 'contained';
  const mockOnPress = jest.fn();
  const mockLoadingState = false;
  const mockIsDisabled = false;

  it('renders correctly with props', () => {
    const { getByText } = render(
      <ButtonComponent
        displayText={mockDisplayText}
        icon={mockIcon}
        mode={mockMode}
        onPress={mockOnPress}
        loadingState={mockLoadingState}
        isDisabled={mockIsDisabled}
      />
    );

    const button = getByText(mockDisplayText);

    expect(button).toBeTruthy();
    expect(button.props.icon).toBe();
    expect(button.props.mode).toBe();
    expect(button.props.onPress).toBe();
    expect(button.props.loading).toBe();
    expect(button.props.disabled).toBe();
  });

  it('calls onPress when the button is pressed', () => {
    const { getByText } = render(
      <ButtonComponent
        displayText={mockDisplayText}
        onPress={mockOnPress}
      />
    );

    const button = getByText(mockDisplayText);
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalled();
  });
});
