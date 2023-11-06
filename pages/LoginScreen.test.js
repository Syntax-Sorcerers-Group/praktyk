// LoginScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'; // extends Jest's expect with jest-native's matchers
import LoginScreen from './LoginScreen';

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

describe('LoginScreen Component Tests', () => {
  test('renders without crashing', () => {
    render(<LoginScreen />);
  });

  test('displays popup when login button is clicked with empty fields', () => {
    const { getByText } = render(<LoginScreen />);

    fireEvent.press(getByText('Login'));

    expect(getByText('Email and/or password is missing.')).not.toBeVisible();
  });

  test('updates email and password state on input change', () => {
    const { getByTestId } = render(<LoginScreen />);

    fireEvent.changeText(getByTestId('Email'), 'test@example.com');
    fireEvent.changeText(getByTestId('Password'), 'password123');

    expect(getByTestId('Email').props.value).toBe('test@example.com');
    expect(getByTestId('Password').props.value).toBe('password123');
  });

  test('does not display popup when login button is clicked with empty fields', () => {
    const { queryByText, getByTestId } = render(<LoginScreen />);

    fireEvent.press(queryByText('Login'));

    expect(queryByText('Email and/or password is missing.')).not.toBeVisible();
  });

  test('updates email and password state on input change', () => {
    const { getByTestId } = render(<LoginScreen />);

    fireEvent.changeText(getByTestId('Email'), 'test@example.com');
    fireEvent.changeText(getByTestId('Password'), 'password123');

    expect(getByTestId('Email').props.value).toBe('test@example.com');
    expect(getByTestId('Password').props.value).toBe('password123');
  });

  test('navigates to "General" route on successful login', async () => {
    const { getByText, getByTestId } = render(<LoginScreen />);
    
    // Mock the successful response from the server
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));

    fireEvent.changeText(getByTestId('Email'), 'test@example.com');
    fireEvent.changeText(getByTestId('Password'), 'password123');
    
    fireEvent.press(getByText('Login'));

  });
});
