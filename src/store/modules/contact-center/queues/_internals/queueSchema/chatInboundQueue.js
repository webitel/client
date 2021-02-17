import queue from './defaults/defaultQueue';
import QueueType from '../enums/QueueType.enum';
import { Strategy } from '../enums/Strategy.enum';
import { TimeBaseScore } from '../enums/TimeBaseScore.enum';

const chatInboundQueue = () => ({
  ...queue(),
  type: QueueType.CHAT_INBOUND_QUEUE,
  team: {}, // required
  strategy: Strategy.FIFO, // required
  processing: false,
  processingSec: 30,
  processingRenewalSec: 15,
  payload: {
    discardAbandonedAfter: 0,
    timeBaseScore: TimeBaseScore.QUEUE,  // required
    maxWaitTime: 60 * 60,  // required
  },
});

export default chatInboundQueue;
