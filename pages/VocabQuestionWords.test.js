import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import VocabQuestionWords from './VocabQuestionWords';

// Mock @react-navigation/native to provide a basic navigation context
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        selectedGrade: 'MockedGrade',
        synonyms: 'MockedSynonyms',
      },
    }),
}));

jest.mock('axios'); // Assuming you use axios and want to mock its behavior

describe('VocabQuestionWords Component', () => {
  it('renders loading indicator initially', () => {
    const { getByTestId } = render(<VocabQuestionWords />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

//   it('fetches and displays words on successful API call', async () => {
//     // Mocking successful API response
//     axios.post.mockResolvedValue({
//       data: {
//         question_words: {
//           hello: 'hallo',
//           world: 'wêreld',
//         },
//       },
//     });

//     const { getByText, queryByTestId } = render(<VocabQuestionWords />);

//     // Wait for API call to complete and loading indicator to disappear
//     await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());

//     // Check if the rendered component displays the fetched words
//     expect(getByText('hallo')).toBeTruthy();
//     expect(getByText('hello')).toBeTruthy();
//   });

//   it('handles API error gracefully', async () => {
//     // Mocking API error
//     axios.post.mockRejectedValue(new Error('Mocked API error'));

//     const { getByText, queryByTestId } = render(<VocabQuestionWords />);

//     // Wait for API call to complete and loading indicator to disappear
//     await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());

//     // Check if the component displays an error message
//     expect(getByText('Error fetching words: Mocked API error')).toBeTruthy();
//   });

//   it('toggles between Afrikaans and English words on Translate button click', async () => {
//     // Mocking successful API response
//     axios.post.mockResolvedValue({
//       data: {
//         question_words: {
//           hello: 'hallo',
//           world: 'wêreld',
//         },
//       },
//     });

//     const { getByText } = render(<VocabQuestionWords />);

//     // Wait for API call to complete and loading indicator to disappear
//     await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());

//     // Check if the initial state displays Afrikaans word
//     expect(getByText('hallo')).toBeTruthy();
//     expect(queryByText('hello')).toBeNull();

//     // Click on Translate button
//     fireEvent.press(getByText('Translate'));

//     // Check if the state now displays English word
//     expect(queryByText('hallo')).toBeNull();
//     expect(getByText('hello')).toBeTruthy();
//   });

//   it('navigates to the previous and next word on button clicks', async () => {
//     // Mocking successful API response
//     axios.post.mockResolvedValue({
//       data: {
//         question_words: {
//           hello: 'hallo',
//           world: 'wêreld',
//         },
//       },
//     });

//     const { getByText } = render(<VocabQuestionWords />);

//     // Wait for API call to complete and loading indicator to disappear
//     await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());

//     // Check if the initial state displays the first word
//     expect(getByText('hallo')).toBeTruthy();
//     expect(queryByText('world')).toBeNull();

//     // Click on Next button
//     fireEvent.press(getByText('--->'));

//     // Check if the state now displays the next word
//     expect(queryByText('hallo')).toBeNull();
//     expect(getByText('world')).toBeTruthy();

//     // Click on Previous button
//     fireEvent.press(getByText('<---'));

//     // Check if the state now displays the previous word
//     expect(getByText('hallo')).toBeTruthy();
//     expect(queryByText('world')).toBeNull();
//   });
});
