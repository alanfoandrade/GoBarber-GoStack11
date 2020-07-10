import { container } from 'tsyringe';

import IQueueProvider from './models/IQueueProvider';
import BullQueueProvider from './implementations/BullQueueProvider';

const providers = {
  bull: BullQueueProvider,
};

container.registerSingleton<IQueueProvider>('QueueProvider', providers.bull);
