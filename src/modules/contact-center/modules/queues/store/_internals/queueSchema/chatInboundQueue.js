import { QueueType } from 'webitel-sdk/esm2015/enums';

import { Strategy } from '../enums/Strategy.enum';
import { TimeBaseScore } from '../enums/TimeBaseScore.enum';
import queue from './defaults/defaultQueue';
import processing from './defaults/processing';

const chatInboundQueue = () => ({
	...queue(),
	type: QueueType.CHAT_INBOUND_QUEUE,
	team: {}, // required
	strategy: Strategy.FIFO, // required
	formSchema: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		discardAbandonedAfter: 0,
		timeBaseScore: TimeBaseScore.QUEUE, // required
		maxWaitTime: 60 * 60, // required
		stickyAgentSec: 5,
		stickyIgnoreStatus: false,
		ignoreCalendar: false,
		maxIdleAgent: 60 * 60, // hour
		maxIdleClient: 60 * 60, // hour
		maxIdleDialog: 0,
		maxWaitingSize: 0,
		minOnlineAgents: 0,
		manualDistribution: false,
		lastMessageTimeout: false,
		maxMemberLimit: 0,
	},
});

export default chatInboundQueue;
