import Queue, { Queue as BullClient } from 'bull';

import queueConfig from '@config/queue';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

import IQueueProvider from '../models/IQueueProvider';
import IQueueJobDTO from '../dtos/IQueueJobDTO';

const sendForgotPasswordEmail = container.resolve(
  SendForgotPasswordEmailService,
);

const jobs = [sendForgotPasswordEmail];

interface IQueue {
  [key: string]: {
    client: BullClient;
    execute(job: any): Promise<void>;
  };
}

export default class BullQueueProvider implements IQueueProvider {
  private queues: IQueue;

  constructor() {
    this.queues = {};

    this.init();
  }

  init(): void {
    jobs.forEach(({ key, execute }) => {
      this.queues[key] = {
        client: new Queue(key, queueConfig),
        execute,
      };
    });
  }

  public async addJob({ key, job }: IQueueJobDTO): Promise<void> {
    await this.queues[key].client.add(job);
  }

  public processQueue(): void {
    jobs.forEach((job) => {
      this.queues[job.key].client.process((queueJob: any) => {
        const { data } = queueJob;
        job.execute(data);
      });
    });
  }
}
