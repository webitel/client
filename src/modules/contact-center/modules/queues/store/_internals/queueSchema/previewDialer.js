import { QueueType } from 'webitel-sdk/esm2015/enums';

import { TypesResourceStrategy } from '../../../enums/TypesResourceStrategy.enum';
import { Strategy } from '../enums/Strategy.enum';
import queue from './defaults/defaultQueue';
import processing from './defaults/processing';

const previewDialer = () => ({
	...queue(),
	type: QueueType.PREVIEW_DIALER,
	team: {}, // required
	strategy: Strategy.FIFO, // required
	doSchema: {},
	afterSchema: {},
	grantee: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		maxAttempts: 3, // required
		originateTimeout: 60, // required
		waitBetweenRetries: 30 * 60, // required
		waitBetweenRetriesDesc: false,
		maxCalls: 10,
		recordings: false,
		recordAll: false,
		allowGreetingAgent: false,
		strictCircuit: false,
		endless: false,
		perNumbers: false,
		minOnlineAgents: 0,
		resourceStrategy: TypesResourceStrategy.EVEN_DISTRIBUTION,
		maxMemberLimit: 0,
	},
});

export default previewDialer;
