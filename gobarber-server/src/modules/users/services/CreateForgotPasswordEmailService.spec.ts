import FakeQueueProvider from '../../../shared/container/providers/QueueProvider/fakes/FakeQueueProvider';
import AppError from '../../../shared/errors/AppError';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateForgotPasswordEmailService from './CreateForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeQueueProvider: FakeQueueProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: CreateForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeQueueProvider = new FakeQueueProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new CreateForgotPasswordEmailService(
      fakeUsersRepository,
      fakeQueueProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const addJobSpy = jest.spyOn(fakeQueueProvider, 'addJob');

    await fakeUsersRepository.create({
      name: 'Test User',
      email: 'testmail@user.com',
      password: '123123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'testmail@user.com',
    });

    expect(addJobSpy).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'testmail@user.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Test User',
      email: 'testmail@user.com',
      password: '123123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'testmail@user.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
