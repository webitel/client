import queue from './defaults/defaultQueue';
import QueueType from '../enums/QueueType.enum';
import { Strategy } from '../enums/Strategy.enum';

const previewDialer = () => ({
  ...queue(),
  type: QueueType.PREVIEW_DIALER,
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
    originateTimeout: 60, // required
    waitBetweenRetries: 30 * 60, // required
    waitBetweenRetriesDesc: false,
    maxCalls: 0,
    recordings: false,
    allowGreetingAgent: false,
  },
});

export default previewDialer;
