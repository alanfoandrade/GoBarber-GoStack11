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

  it('should be able to sign in', async () => {
    const { getByTestId, getByPlaceholder } = render(<SignIn />);

    const emailInput = getByPlaceholder('E-mail');
    const passwordInput = getByPlaceholder('Senha');
    const signinButton = getByTestId('signin-button');

    fireEvent.changeText(emailInput, {
      target: { value: 'johndoe@example.com' },
    });

    fireEvent.changeText(passwordInput, {
      target: { value: '123123' },
    });

    fireEvent.press(signinButton);

    expect(mockedSignIn).toHaveBeenCalled();
  });
});
