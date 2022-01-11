import queue from './defaults/defaultQueue';
import amd from './defaults/amd';
import QueueType from '../enums/QueueType.enum';
import { Strategy } from '../enums/Strategy.enum';

const outboundIVRQueue = () => ({
  ...queue(),
  type: QueueType.OUTBOUND_IVR_QUEUE,
  strategy: Strategy.FIFO, // required
  schema: {},
  doSchema: {},
  afterSchema: {},
  payload: {
    minDuration: 3,
    maxAttempts: 3, // required
    originateTimeout: 60, // required
    waitBetweenRetries: 30 * 60, // required
    waitBetweenRetriesDesc: false,
    maxCalls: 10,
    recordings: false,
    amd: amd(),
    strictCircuit: false,
    perNumbers: false,
  },
});

export default outboundIVRQueue;
