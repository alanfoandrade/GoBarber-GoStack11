import 'reflect-metadata';
import 'dotenv/config';

import '@shared/infra/typeorm';
import '@shared/container';

import { container } from 'tsyringe';

import BullQueueProvider from '@shared/container/providers/QueueProvider/implementations/BullQueueProvider';

const queue = container.resolve(BullQueueProvider);

queue.processQueue();
