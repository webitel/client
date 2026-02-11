import { QueueType } from 'webitel-sdk/esm2015/enums';

import { TypesResourceStrategy } from '../../../enums/TypesResourceStrategy.enum';
import { Strategy } from '../enums/Strategy.enum';
import amd from './defaults/amd';
import queue from './defaults/defaultQueue';
import processing from './defaults/processing';

const predictiveDialer = () => ({
	...queue(),
	type: QueueType.PREDICTIVE_DIALER,
	strategy: Strategy.FIFO, // required
	team: {}, // required
	doSchema: {},
	afterSchema: {},
	ringtone: {},
	grantee: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		maxWaitTime: 10,
		maxAttempts: 3, // required
		originateTimeout: 60, // required
		waitBetweenRetries: 30 * 60, // required
		waitBetweenRetriesDesc: false,
		retryAbandoned: false,
		recordings: false,
		recordAll: false,
		allowGreetingAgent: false,
		maxCalls: 10,
		dialingRate: 5,
		amd: amd(),
		maxAgentLine: 5,
		minAttempts: 3,
		maxAbandonedRate: 5.0,
		targetAbandonedRate: 3.0,
		loadFactor: 10,
		maxAgentLose: 1,
		abandonRateAdjustment: 0,
		playbackSilence: 0,
		strictCircuit: false,
		statisticTime: 60,
		endless: false,
		perNumbers: false,
		stickyAgentSec: 5,
		autoAnswerTone: null,
		minOnlineAgents: 0,
		resourceStrategy: TypesResourceStrategy.EVEN_DISTRIBUTION,
		maxMemberLimit: 0,
	},
});

export default predictiveDialer;
