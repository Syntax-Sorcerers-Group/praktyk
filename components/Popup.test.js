import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Popup from './Popup';

test('Popup component renders correctly', () => {
  // Arrange
  const labelText = 'Dismiss';
  const displayText = 'This is a Snackbar message';
  const timeout = 2000; // Adjust as needed

  // Act
  const { getByText, queryByText } = render(
    <Popup
      state={true} // Snackbar is initially visible
      setState={() => {}} // Mock setState function
      labelText={labelText}
      displayText={displayText}
      timeout={timeout}
    />
  );

  // Assert
  // Check if the Snackbar message is displayed
  expect(getByText(displayText)).toBeTruthy();

  // Dismiss the Snackbar
  fireEvent.press(getByText(labelText));

  // Check if the Snackbar is no longer in the document (dismissed)
//   expect(queryByText(displayText)).toBeNull();
});
