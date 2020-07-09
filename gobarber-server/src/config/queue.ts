import { RedisOptions } from 'ioredis';

interface IQueueConfig {
  driver: 'bull';

  config: {
    bull: {
      redis: RedisOptions;
    };
  };
}

export default {
  driver: 'bull',

  config: {
    bull: {
      limiter: {
        max: 90,
        duration: 1000,
      },
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_QUEUE_PORT,
        password: process.env.REDIS_PASS || undefined,
      },
    },
  },
} as IQueueConfig;
