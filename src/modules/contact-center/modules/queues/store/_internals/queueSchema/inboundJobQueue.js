import { QueueType } from 'webitel-sdk/esm2015/enums';

import { Strategy } from '../enums/Strategy.enum';
import queue from './defaults/defaultQueue';
import processing from './defaults/processing';

const inboundJobQueue = () => ({
	...queue(),
	type: QueueType.INBOUND_JOB_QUEUE,
	team: {}, // required
	strategy: Strategy.FIFO, // required
	doSchema: {},
	afterSchema: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		maxAttempts: 3, // required
		waitBetweenRetries: 30 * 60, // required
		maxCalls: 10,
		waitBetweenRetriesDesc: false,
		minOnlineAgents: 0,
		maxMemberLimit: 0,
	},
});

export default inboundJobQueue;
