import 'dotenv/config';

import { container } from 'tsyringe';

import QueueProvider from '@shared/container/providers/QueueProvider/implementations/BullQueueProvider';

const queueProvider = container.resolve(QueueProvider);

queueProvider.process();
