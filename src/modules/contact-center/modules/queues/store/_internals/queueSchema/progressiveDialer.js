import queue from './defaults/defaultQueue';
import amd from './defaults/amd';
import QueueType from '../enums/QueueType.enum';
import { Strategy } from '../enums/Strategy.enum';

const progressiveDialer = () => ({
  ...queue(),
  type: QueueType.PROGRESSIVE_DIALER,
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
    recordings: false,
    allowGreetingAgent: false,
    maxCalls: 10,
    amd: amd(),
    strictCircuit: false,
    endless: false,
    perNumbers: false,
  },
});

export default progressiveDialer;
