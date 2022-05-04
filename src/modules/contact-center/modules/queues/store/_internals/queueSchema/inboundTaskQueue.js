import { QueueType } from 'webitel-sdk/esm2015/enums';
import queue from './defaults/defaultQueue';
import { Strategy } from '../enums/Strategy.enum';

const inboundTaskQueue = () => ({
  ...queue(),
  type: QueueType.INBOUND_TASK_QUEUE,
  team: {}, // required
  strategy: Strategy.FIFO, // required
  doSchema: {},
  afterSchema: {},
  processing: false,
  processingSec: 30,
  processingRenewalSec: 15,
  stickyAgent: false,
  payload: {
    maxAttempts: 3, // required
    waitBetweenRetries: 30 * 60, // required
    maxCalls: 10,
    waitBetweenRetriesDesc: false,
  },
});

export default inboundTaskQueue;