import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

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

  it('should be able to sign in', async () => {
    const { getByTestId, getByPlaceholder } = render(<SignIn />);

    const emailInput = getByPlaceholder('E-mail');
    const passwordInput = getByPlaceholder('Senha');
    const signinButton = getByTestId('signin-button');

    fireEvent.changeText(emailInput, 'johndoe@example.com');

    fireEvent.changeText(passwordInput, '123123');

    fireEvent.press(signinButton);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalled();
    });
  });
});
