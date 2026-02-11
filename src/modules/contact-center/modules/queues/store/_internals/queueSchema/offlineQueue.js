import { QueueType } from 'webitel-sdk/esm2015/enums';

import { Strategy } from '../enums/Strategy.enum';
import queue from './defaults/defaultQueue';
import processing from './defaults/processing';

const offlineQueue = () => ({
	...queue(),
	type: QueueType.OFFLINE_QUEUE,
	team: {}, // required
	strategy: Strategy.FIFO, // required
	doSchema: {},
	afterSchema: {},
	grantee: {},
	taskProcessing: processing(),
	payload: {
		maxAttempts: 3, // required
		waitBetweenRetries: 30 * 60, // required
		originateTimeout: 60, // required
		recordings: false,
		recordAll: false,
		perNumbers: false,
		minOnlineAgents: 0,
		maxMemberLimit: 0,
	},
});

export default offlineQueue;
