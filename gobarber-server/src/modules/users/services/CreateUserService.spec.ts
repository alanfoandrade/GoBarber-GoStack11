import AppError from '../../../shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Test User',
      email: 'testmail@user.com',
      password: '123123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email form another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Test User',
      email: 'testmail@user.com',
      password: '123123123',
    });

    expect(
      createUser.execute({
        name: 'Test User',
        email: 'testmail@user.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
