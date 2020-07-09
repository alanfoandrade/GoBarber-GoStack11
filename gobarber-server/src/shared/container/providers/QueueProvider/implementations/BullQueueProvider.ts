import Bull from 'bull';
import { container } from 'tsyringe';

import queueConfig from '@config/queue';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import IQueueProvider from '../models/IQueueProvider';

const sendForgotPasswordEmail = container.resolve(
  SendForgotPasswordEmailService,
);

const jobs = [sendForgotPasswordEmail];

export default class BullQueueProvider implements IQueueProvider {
  private queues: Record<string, any>;

  constructor() {
    this.queues = {};

    this.init();
  }

  private init(): void {
    jobs.forEach(({ key, execute }) => {
      this.queues[key] = {
        queue: new Bull(key, queueConfig.config.bull),
        execute,
      };
    });
  }

  public async add(queue: string, job: any): Promise<void> {
    this.queues[queue].queue.add(JSON.stringify(job));
  }

  public async process(): Promise<void> {
    jobs.forEach((job) => {
      const { queue, execute } = this.queues[job.key];

      queue.process(execute);
    });
  }
}
