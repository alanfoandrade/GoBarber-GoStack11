import { Request, Response } from 'express';
import { container } from 'tsyringe';

import QueueProvider from '@shared/container/providers/QueueProvider/implementations/BullQueueProvider';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    const queueProvider = container.resolve(QueueProvider);

    queueProvider.add(sendForgotPasswordEmail.key, email);

    return response.status(204).json();
  }
}
