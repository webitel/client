import { QueueType } from 'webitel-sdk/esm2015/enums';
import queue from './defaults/defaultQueue';
import { Strategy } from '../enums/Strategy.enum';

const outboundTaskQueue = () => ({
  ...queue(),
  type: QueueType.OUTBOUND_TASK_QUEUE,
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

export default outboundTaskQueue;
