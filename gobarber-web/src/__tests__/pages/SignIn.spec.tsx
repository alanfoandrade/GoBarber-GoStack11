import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import SignIn from '../../pages/SignIn';

const mockedSignIn = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    // useHistory: () => ({
    //   push: jest.fn(),
    // }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

const mockedAddToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedSignIn.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedSignIn).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'johndoe@example.com',
          password: '123123',
        }),
      );
    });
  });

  it('should not be able to sign in with invalid credentials format', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'not-valid-email-format' },
    });
    fireEvent.change(passwordField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedSignIn).not.toHaveBeenCalled();
    });
  });

  it('should display an error when trying to login with non-existing credentials', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'non-existing@example.com' },
    });
    fireEvent.change(passwordField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
