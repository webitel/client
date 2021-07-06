import queue from './defaults/defaultQueue';
import amd from './defaults/amd';
import QueueType from '../enums/QueueType.enum';
import { Strategy } from '../enums/Strategy.enum';

const predictiveDialer = () => ({
  ...queue(),
  type: QueueType.PREDICTIVE_DIALER,
  strategy: Strategy.FIFO, // required
  team: {}, // required
  doSchema: {},
  ringtone: {},
  processing: false,
  processingSec: 30,
  processingRenewalSec: 15,
  stickyAgent: false,
  payload: {
    maxWaitTime: 10,
    maxAttempts: 3, // required
    originateTimeout: 60, // required
    waitBetweenRetries: 30 * 60, // required
    waitBetweenRetriesDesc: false,
    retryAbandoned: false,
    recordings: false,
    allowGreetingAgent: false,
    maxCalls: 0,
    amd: amd(),
  },
});

export default predictiveDialer;
