import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import SignIn from '../../pages/SignIn';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const mockedSignIn = jest.fn();

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedSignIn.mockClear();
  });

  it('should be able to sign in', () => {
    const { getByTestId } = render(<SignIn />);

    const buttonElement = getByTestId('signin-button');

    fireEvent.press(buttonElement);

    expect(mockedSignIn).toHaveBeenCalled();
  });
});
