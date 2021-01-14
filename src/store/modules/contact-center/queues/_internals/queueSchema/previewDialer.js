import queue from './defaults/defaultQueue';
import { Strategy } from '../enums/Strategy.enum';

const previewDialer = () => ({
  ...queue(),
  type: 3,
  team: {}, // required
  strategy: Strategy.FIFO, // required
  doSchema: {},
  afterSchema: {},
  payload: {
    maxAttempts: 3, // required
    originateTimeout: 60, // required
    waitBetweenRetries: 30 * 60, // required
    recordings: false,
  },
});

export default previewDialer;
