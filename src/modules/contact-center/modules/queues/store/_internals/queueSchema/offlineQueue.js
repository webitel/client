import queue from './defaults/defaultQueue';
import QueueType from '../enums/QueueType.enum';
import { Strategy } from '../enums/Strategy.enum';

const offlineQueue = () => ({
  ...queue(),
  type: QueueType.OFFLINE_QUEUE,
  team: {}, // required
  strategy: Strategy.FIFO, // required
  doSchema: {},
  afterSchema: {},
  processing: false,
  processingSec: 30,
  processingRenewalSec: 15,
  payload: {
    originateTimeout: 60, // required
    recordings: false,
    perNumbers: false,
  },
});

export default offlineQueue;
