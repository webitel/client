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
  stickyAgent: false,
  payload: {
    discardAbandonedAfter: 0,
    timeBaseScore: TimeBaseScore.QUEUE, // required
    maxWaitTime: 60 * 60, // required
    stickyAgentSec: 5,
    maxIdleAgent: 86400,
    maxIdleClient: 86400,
  },
});

export default chatInboundQueue;
