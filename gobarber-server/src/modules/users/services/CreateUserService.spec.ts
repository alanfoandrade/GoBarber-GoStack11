import AppError from '../../../shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await createUser.execute({
      name: 'Test User',
      email: 'testmail@user.com',
      password: '123123123',
    });

    expect(generateHash).toHaveBeenCalledWith('123123123');
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Test User',
      email: 'testmail@user.com',
      password: '123123123',
    });

    await expect(
      createUser.execute({
        name: 'Test User',
        email: 'testmail@user.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
