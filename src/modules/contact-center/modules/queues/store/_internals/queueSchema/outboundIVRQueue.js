import { QueueType } from 'webitel-sdk/esm2015/enums';

import { TypesResourceStrategy } from '../../../enums/TypesResourceStrategy.enum';
import { Strategy } from '../enums/Strategy.enum';
import amd from './defaults/amd';
import queue from './defaults/defaultQueue';

const outboundIVRQueue = () => ({
	...queue(),
	type: QueueType.OUTBOUND_IVR_QUEUE,
	strategy: Strategy.FIFO, // required
	schema: {},
	doSchema: {},
	afterSchema: {},
	grantee: {},
	payload: {
		minDuration: 3,
		maxAttempts: 3, // required
		originateTimeout: 60, // required
		waitBetweenRetries: 30 * 60, // required
		waitBetweenRetriesDesc: false,
		maxCalls: 10,
		recordings: false,
		recordAll: false,
		amd: amd(),
		strictCircuit: false,
		perNumbers: false,
		resourceStrategy: TypesResourceStrategy.EVEN_DISTRIBUTION,
		maxMemberLimit: 0,
	},
});

export default outboundIVRQueue;
