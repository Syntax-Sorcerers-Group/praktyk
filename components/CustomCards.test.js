import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomCard from './CustomCards'; // assuming your component file is named CustomCard.js

describe('CustomCard component', () => {
  const mockTitle = 'Sample Title';
  const mockImageUrl = 'https://example.com/image.jpg';
  const mockOnPress = jest.fn();

  it('renders correctly with title and image', () => {
    const { getByTestId, getByText } = render(
      <CustomCard title={mockTitle} imageUrl={mockImageUrl} onPress={mockOnPress} />
    );

    const card = getByTestId('custom-card');
    const titleText = getByText(mockTitle);
    const image = getByTestId('card-image');

    expect(card).toBeTruthy();
    expect(titleText).toBeTruthy();
    expect(image).toBeTruthy();
    expect(titleText.props.style.textAlign).toBe();
  });

  it('calls onPress when the card is pressed', () => {
    const { getByTestId } = render(
      <CustomCard title={mockTitle} imageUrl={mockImageUrl} onPress={mockOnPress} />
    );

    const card = getByTestId('custom-card');
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalled();
  });
});
