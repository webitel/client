import { QueueType } from 'webitel-sdk/esm2015/enums';
import queue from './defaults/defaultQueue';
import { TimeBaseScore } from '../enums/TimeBaseScore.enum';

const inboundQueue = () => ({
  ...queue(),
  type: QueueType.INBOUND_QUEUE,
  team: {}, // required
  ringtone: {},
  formSchema: {},
  processing: false,
  processingSec: 30,
  processingRenewalSec: 15,
  stickyAgent: false,
  payload: {
    discardAbandonedAfter: 0,
    timeBaseScore: TimeBaseScore.QUEUE, // required
    maxWaitTime: 60 * 60, // required
    allowGreetingAgent: false,
    stickyAgentSec: 5,
  },
});

export default inboundQueue;
