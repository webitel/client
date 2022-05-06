import { QueueType } from 'webitel-sdk/esm2015/enums';
import queue from './defaults/defaultQueue';
import { Strategy } from '../enums/Strategy.enum';
import { TimeBaseScore } from '../enums/TimeBaseScore.enum';

const chatInboundQueue = () => ({
  ...queue(),
  type: QueueType.CHAT_INBOUND_QUEUE,
  team: {}, // required
  strategy: Strategy.FIFO, // required
  formSchema: {},
  processing: false,
  processingSec: 30,
  processingRenewalSec: 15,
  stickyAgent: false,
  payload: {
    discardAbandonedAfter: 0,
    timeBaseScore: TimeBaseScore.QUEUE, // required
    maxWaitTime: 60 * 60, // required
    stickyAgentSec: 5,
    maxIdleAgent: 60 * 60, // hour
    maxIdleClient: 60 * 60, // hour
  },
});

export default chatInboundQueue;
