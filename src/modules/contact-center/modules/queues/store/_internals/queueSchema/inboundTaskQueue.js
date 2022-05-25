import { QueueType } from 'webitel-sdk/esm2015/enums';
import queue from './defaults/defaultQueue';
import { Strategy } from '../enums/Strategy.enum';
import processing from './defaults/processing';

const inboundTaskQueue = () => ({
  ...queue(),
  type: QueueType.INBOUND_TASK_QUEUE,
  team: {}, // required
  strategy: Strategy.FIFO, // required
  doSchema: {},
  afterSchema: {},
  stickyAgent: false,
  processing: processing(),
  payload: {
    maxAttempts: 3, // required
    waitBetweenRetries: 30 * 60, // required
    maxCalls: 10,
    waitBetweenRetriesDesc: false,
  },
});

export default inboundTaskQueue;
