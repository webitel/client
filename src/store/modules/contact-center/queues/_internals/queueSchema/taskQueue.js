import queue from './defaults/defaultQueue';
import QueueType from '../enums/QueueType.enum';
import { Strategy } from '../enums/Strategy.enum';

const taskQueue = () => ({
  ...queue(),
  type: QueueType.TASK_QUEUE,
  team: {}, // required
  strategy: Strategy.FIFO, // required
  doSchema: {},
  afterSchema: {},
  payload: {
    maxAttempts: 3, // required
    waitBetweenRetries: 30 * 60, // required
  },
});

export default taskQueue;
