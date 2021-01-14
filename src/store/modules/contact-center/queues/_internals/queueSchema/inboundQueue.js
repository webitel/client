import queue from './defaults/defaultQueue';
import { TimeBaseScore } from '../enums/TimeBaseScore.enum';

const inboundQueue = () => ({
  ...queue(),
  type: 1,
  team: {}, // required
  ringtone: {},
  payload: {
    discardAbandonedAfter: 0,
    timeBaseScore: TimeBaseScore.QUEUE,  // required
    maxWaitTime: 5 * 60,  // required
    allowGreetingAgent: false,
  },
});

export default inboundQueue;
