import { QueueType } from 'webitel-sdk/esm2015/enums';
import queue from './defaults/defaultQueue';
import { Strategy } from '../enums/Strategy.enum';
import processing from './defaults/processing';

const offlineQueue = () => ({
  ...queue(),
  type: QueueType.OFFLINE_QUEUE,
  team: {}, // required
  strategy: Strategy.FIFO, // required
  doSchema: {},
  afterSchema: {},
  taskProcessing: processing(),
  payload: {
    originateTimeout: 60, // required
    recordings: false,
    perNumbers: false,
  },
});

export default offlineQueue;
