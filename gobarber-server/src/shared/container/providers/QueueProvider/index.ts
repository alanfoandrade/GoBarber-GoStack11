import { container } from 'tsyringe';
import queueConfig from '@config/queue';

import IQueueProvider from './models/IQueueProvider';
import BullQueueProvider from './implementations/BullQueueProvider';

const providers = {
  bull: BullQueueProvider,
};

container.registerSingleton<IQueueProvider>(
  'QueueProvider',
  providers[queueConfig.driver],
);
