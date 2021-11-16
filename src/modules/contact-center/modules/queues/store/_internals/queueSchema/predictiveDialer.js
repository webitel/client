import queue from './defaults/defaultQueue';
import amd from './defaults/amd';
import QueueType from '../enums/QueueType.enum';
import { Strategy } from '../enums/Strategy.enum';

const predictiveDialer = () => ({
  ...queue(),
  type: QueueType.PREDICTIVE_DIALER,
  strategy: Strategy.FIFO, // required
  team: {}, // required
  doSchema: {},
  afterSchema: {},
  ringtone: {},
  processing: false,
  processingSec: 30,
  processingRenewalSec: 15,
  stickyAgent: false,
  payload: {
    maxWaitTime: 10,
    maxAttempts: 3, // required
    originateTimeout: 60, // required
    waitBetweenRetries: 30 * 60, // required
    waitBetweenRetriesDesc: false,
    retryAbandoned: false,
    recordings: false,
    allowGreetingAgent: false,
    maxCalls: 10,
    amd: amd(),
    maxAgentLine: 5,
    minAttempts: 3,
    maxAbandonedRate: 5.0,
    targetAbandonedRate: 3.0,
    maxAgentLose: 1,
    abandonRateAdjustment: 0,
    playbackSilence: 0,
    strictCircuit: false,
    statisticTime: 60,
    endless: false,
  },
});

export default predictiveDialer;
