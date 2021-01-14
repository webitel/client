import queue from './defaults/defaultQueue';
import amd from './defaults/amd';
import { Strategy } from '../enums/Strategy.enum';

const outboundIVRQueue = () => ({
  ...queue(),
  type: 2,
  strategy: Strategy.FIFO,  // required
  schema: {},
  doSchema: {},
  afterSchema: {},
  payload: {
    minDuration: 3,
    maxAttempts: 3, // required
    originateTimeout: 60, // required
    waitBetweenRetries: 60,  // required
    recordings: false,
    amd: amd(),
  },
});

export default outboundIVRQueue;
