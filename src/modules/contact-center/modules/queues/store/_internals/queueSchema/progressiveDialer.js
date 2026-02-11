import { QueueType } from 'webitel-sdk/esm2015/enums';

import { TypesResourceStrategy } from '../../../enums/TypesResourceStrategy.enum';
import { Strategy } from '../enums/Strategy.enum';
import amd from './defaults/amd';
import queue from './defaults/defaultQueue';
import processing from './defaults/processing';

const progressiveDialer = () => ({
	...queue(),
	type: QueueType.PROGRESSIVE_DIALER,
	team: {}, // required
	strategy: Strategy.FIFO, // required
	doSchema: {},
	afterSchema: {},
	ringtone: {},
	grantee: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		maxAttempts: 3, // required
		originateTimeout: 60, // required
		waitBetweenRetries: 30 * 60, // required
		waitBetweenRetriesDesc: false,
		recordings: false,
		recordAll: false,
		allowGreetingAgent: false,
		maxCalls: 10,
		amd: amd(),
		strictCircuit: false,
		endless: false,
		perNumbers: false,
		autoAnswerTone: null,
		minOnlineAgents: 0,
		resourceStrategy: TypesResourceStrategy.EVEN_DISTRIBUTION,
		maxMemberLimit: 0,
	},
});

export default progressiveDialer;
