import IQueueProvider from '../models/IQueueProvider';

import IQueueJobDTO from '../dtos/IQueueJobDTO';

interface IQueue {
  key?: string;
  job?: any;
}

class BullQueueProvider implements IQueueProvider {
  private queues: IQueue;

  public async addJob({ key, job }: IQueueJobDTO): Promise<void> {
    this.queues = { key, job };
  }

  public processQueue(): void {
    this.queues = {};
  }
}

export default BullQueueProvider;
