import { QueueType } from 'webitel-sdk/esm2015/enums';

import { TimeBaseScore } from '../enums/TimeBaseScore.enum';
import queue from './defaults/defaultQueue';
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
		stickyIgnoreStatus: false,
		ignoreCalendar: false,
		stickyAgentSec: 5,
		maxWaitingSize: 0,
		autoAnswerTone: null,
		minOnlineAgents: 0,
		manualDistribution: false,
		maxMemberLimit: 0,
	},
});

export default inboundQueue;
