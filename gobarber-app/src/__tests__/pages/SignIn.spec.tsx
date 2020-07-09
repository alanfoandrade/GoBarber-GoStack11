import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import SignIn from '../../pages/SignIn';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('SignIn Page', () => {
  it('should press submit button and show console log', () => {
    const { getByTestId } = render(<SignIn />);

    const buttonElement = getByTestId('signin-button');

    fireEvent.press(buttonElement);
  });
});
