import { QueueType } from 'webitel-sdk/esm2015/enums';
import queue from './defaults/defaultQueue';
import { TimeBaseScore } from '../enums/TimeBaseScore.enum';
import processing from './defaults/processing';

const inboundQueue = () => ({
  ...queue(),
  type: QueueType.INBOUND_QUEUE,
  team: {}, // required
  ringtone: {},
  grantee: {},
  stickyAgent: false,
  taskProcessing: processing(),
  payload: {
    discardAbandonedAfter: 0,
    timeBaseScore: TimeBaseScore.QUEUE, // required
    maxWaitTime: 60 * 60, // required
    allowGreetingAgent: false,
    stickyAgentSec: 5,
    maxWaitingSize: 0,
    autoAnswerTone: null,
    minOnlineAgents: 0,
    manualDistribution: false,
  },
});

export default inboundQueue;
