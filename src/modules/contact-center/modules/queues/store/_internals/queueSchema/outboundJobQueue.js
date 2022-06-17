import { QueueType } from 'webitel-sdk/esm2015/enums';
import queue from './defaults/defaultQueue';
import { Strategy } from '../enums/Strategy.enum';

const outboundJobQueue = () => ({
  ...queue(),
  type: QueueType.OUTBOUND_JOB_QUEUE,
  strategy: Strategy.FIFO, // required
  schema: {},
  doSchema: {},
  afterSchema: {},
  payload: {

    maxAttempts: 3, // required
    originateTimeout: 60, // required
    waitBetweenRetries: 30 * 60, // required
    waitBetweenRetriesDesc: false,
    maxCalls: 10,
    strictCircuit: false,
    perNumbers: false,
  },
});

export default outboundJobQueue;
