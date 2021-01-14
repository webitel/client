import queue from './defaults/defaultQueue';
import amd from './defaults/amd';
import { Strategy } from '../enums/Strategy.enum';

const progressiveDialer = () => ({
  ...queue(),
  type: 4,
  team: {}, // required
  strategy: Strategy.FIFO, // required
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

export default progressiveDialer;
