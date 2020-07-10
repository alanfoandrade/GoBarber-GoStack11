import 'reflect-metadata';
import 'dotenv/config';

import { container } from 'tsyringe';

import BullQueueProvider from '@shared/container/providers/QueueProvider/implementations/BullQueueProvider';

const queue = container.resolve(BullQueueProvider);

queue.processQueue();
