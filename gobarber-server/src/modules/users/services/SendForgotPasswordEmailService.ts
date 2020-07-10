import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

@injectable()
class SendForgotPasswordEmailService {
  get key(): string {
    return 'ForgotPasswordEmail';
  }

  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(messageData: ISendMailDTO): Promise<void> {
    await this.mailProvider.sendMail(messageData);
  }
}

export default SendForgotPasswordEmailService;
