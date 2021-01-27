import queue from './defaults/defaultQueue';
import QueueType from '../enums/QueueType.enum';
import { Strategy } from '../enums/Strategy.enum';

const offlineQueue = () => ({
  ...queue(),
  type: QueueType.OFFLINE_QUEUE,
  team: {}, // required
  strategy: Strategy.FIFO,  // required
  doSchema: {},
  afterSchema: {},
  payload: {
    originateTimeout: 60, // required
    recordings: false,
  },
});

export default offlineQueue;
