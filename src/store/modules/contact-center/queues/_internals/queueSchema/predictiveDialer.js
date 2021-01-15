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
  afterSchema: {},
  payload: {
    maxAttempts: 3, // required
    originateTimeout: 60, // required
    waitBetweenRetries: 30 * 60, // required
    recordings: false,
    allowGreetingAgent: false,
    amd: amd(),
  },
});

export default predictiveDialer;
