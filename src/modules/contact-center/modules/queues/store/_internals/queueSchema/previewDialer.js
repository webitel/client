import { QueueType } from 'webitel-sdk/esm2015/enums';
import queue from './defaults/defaultQueue';
import { Strategy } from '../enums/Strategy.enum';
import processing from './defaults/processing';

const previewDialer = () => ({
  ...queue(),
  type: QueueType.PREVIEW_DIALER,
  team: {}, // required
  strategy: Strategy.FIFO, // required
  doSchema: {},
  afterSchema: {},
  stickyAgent: false,
  processing: processing(),
  payload: {
    maxAttempts: 3, // required
    originateTimeout: 60, // required
    waitBetweenRetries: 30 * 60, // required
    waitBetweenRetriesDesc: false,
    maxCalls: 10,
    recordings: false,
    allowGreetingAgent: false,
    strictCircuit: false,
    endless: false,
    perNumbers: false,
  },
});

export default previewDialer;
