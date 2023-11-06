import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";

// Mock @react-navigation/native to provide a basic navigation context
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("LoginScreen", () => {
//   it("renders the component correctly", () => {
//     const { getByText, getByPlaceholderText } = render(
//       <NavigationContainer>
//         <LoginScreen />
//       </NavigationContainer>
//     );

//     // Check if the component renders elements as expected
//     expect(getByText("Login")).toBeTruthy();
//     expect(getByPlaceholderText("Email")).toBeTruthy();
//     expect(getByPlaceholderText("Password")).toBeTruthy();
//   });

//   it("handles login with valid data", async () => {
//     const { getByText, getByPlaceholderText } = render(<LoginScreen />);

//     const emailInput = getByPlaceholderText("Email");
//     const passwordInput = getByPlaceholderText("Password");

//     // Use fireEvent.changeText to change the text of TextInput elements
//     fireEvent.changeText(emailInput, "test@example.com");
//     fireEvent.changeText(passwordInput, "password123");

//     const loginButton = getByText("Login");
//     fireEvent.press(loginButton);

//     // You may want to add assertions based on your actual API response
//     // For example, you can check if navigation is correctly called after a successful login.
//     // Mocking the API response and navigation is recommended for unit testing.
//   });

  it("handles login with missing data", async () => {
    const { getByText } = render(<LoginScreen />);
    const loginButton = getByText("Login");

    fireEvent.press(loginButton);

    // You can add assertions to check if the popup for missing data is displayed.
    // Mocking the API response and navigation is recommended for unit testing.
  });

//   it("handles login with incorrect email and password", async () => {
//     const { getByText, getByPlaceholderText } = render(<LoginScreen />);

//     const emailInput = getByPlaceholderText("Email");
//     const passwordInput = getByPlaceholderText("Password");

//     // Use fireEvent.changeText to change the text of TextInput elements
//     fireEvent.changeText(emailInput, "test@example.com");
//     fireEvent.changeText(passwordInput, "incorrectPassword");

//     const loginButton = getByText("Login");
//     fireEvent.press(loginButton);

//     // You can add assertions to check if the popup for incorrect email/password is displayed.
//     // Mocking the API response and navigation is recommended for unit testing.
//   });
});
