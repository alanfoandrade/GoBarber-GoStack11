import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authtenticateUser: AuthenticateUserService;

describe('AuthtenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authtenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
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
    await expect(
      authtenticateUser.execute({
        email: 'testmail@user.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Test User',
      email: 'testmail@user.com',
      password: '123123123',
    });

    await expect(
      authtenticateUser.execute({
        email: 'testmail@user.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
