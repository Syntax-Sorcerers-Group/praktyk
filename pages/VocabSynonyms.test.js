import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import VocabSynonyms from './VocabSynonyms';

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

jest.mock('axios'); // Mock axios to avoid actual API calls during testing

describe('VocabSynonyms', () => {
  test('renders loading indicator initially', async () => {
    const { getByTestId } = render(<VocabSynonyms />);
    expect(getByTestId('loading-indicator')).toBeDefined();
  });
});
