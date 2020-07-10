import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { act } from 'react-dom/test-utils';
import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const mockedApi = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    mockedApi.onPost('sessions').reply(200, {
      user: {
        id: 'uuid',
        name: 'John Doe',
        email: 'johndoe@example.com.br',
      },
      token: 'JWTtoken',
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should save data on localStorage', async () => {
    const apiResponse = {
      user: {
        id: 'uuid',
        name: 'John Doe',
        email: 'johndoe@example.com.br',
      },
      token: 'JWTtoken',
    };

    mockedApi.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
  });

  it('should load data from localStorage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'JWTtoken';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'uuid',
            name: 'John Doe',
            email: 'johndoe@example.com.br',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should set token on default headers from api', async () => {
    const apiResponse = {
      user: {
        id: 'uuid',
        name: 'John Doe',
        email: 'johndoe@example.com.br',
      },
      token: 'JWTtoken',
    };

    mockedApi.onPost('sessions').reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(
      mockedApi
        .onPost(
          '/profile',
          { id: 'uuid' },
          expect.objectContaining({
            Authorization: expect.stringMatching(/^Bearer JWTtoken /),
          }),
        )
        .reply(204),
    );
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'JWTtoken';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'uuid',
            name: 'John Doe',
            email: 'johndoe@example.com.br',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'uuid',
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      avatar_url: 'http://avatar_url',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
