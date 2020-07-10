import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateForgotPasswordEmailService from '@modules/users/services/CreateForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const createForgotPasswordEmail = container.resolve(
      CreateForgotPasswordEmailService,
    );

    await createForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
