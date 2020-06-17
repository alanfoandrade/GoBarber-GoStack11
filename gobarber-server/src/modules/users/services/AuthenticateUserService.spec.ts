import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthtenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authtenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Test User',
      email: 'testmail@user.com',
      password: '123123123',
    });

    const response = await authtenticateUser.execute({
      email: 'testmail@user.com',
      password: '123123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authtenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authtenticateUser.execute({
        email: 'testmail@user.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authtenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await fakeUsersRepository.create({
      name: 'Test User',
      email: 'testmail@user.com',
      password: '123123123',
    });

    expect(
      authtenticateUser.execute({
        email: 'testmail@user.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
