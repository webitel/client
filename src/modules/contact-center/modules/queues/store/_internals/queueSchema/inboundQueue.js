import queue from './defaults/defaultQueue';
import QueueType from '../enums/QueueType.enum';
import { TimeBaseScore } from '../enums/TimeBaseScore.enum';

const inboundQueue = () => ({
  ...queue(),
  type: QueueType.INBOUND_QUEUE,
  team: {}, // required
  ringtone: {},
  processing: false,
  processingSec: 30,
  processingRenewalSec: 15,
  payload: {
    discardAbandonedAfter: 0,
    timeBaseScore: TimeBaseScore.QUEUE,  // required
    maxWaitTime: 60 * 60,  // required
    allowGreetingAgent: false,
  },
});

export default inboundQueue;
