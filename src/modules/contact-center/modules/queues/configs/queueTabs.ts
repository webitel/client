import { QueueType } from '@webitel/ui-sdk/enums';

export const QueueTabId = {
	General: 'general',
	Params: 'params',
	Processing: 'processing',
	Agents: 'agents',
	Skills: 'skills',
	Resources: 'resources',
	Buckets: 'buckets',
	Hooks: 'hooks',
	Amd: 'amd',
	Variables: 'variables',
	Permissions: 'permissions',
	Logs: 'logs',
} as const;

export type QueueTabId = (typeof QueueTabId)[keyof typeof QueueTabId];

export interface QueueTab {
	text: string;
	value: QueueTabId;
	pathName: string;
	/** a tab the user has no read access to is dropped, not shown greyed out */
	disabled?: boolean;
}

/**
 * The tabs that vary by queue type.
 *
 * Every queue leads with General and Parameters and trails with Hooks and
 * Variables; Permissions and Logs are appended only once the queue exists.
 * Only the middle section is type-dependent, and that is what this table holds.
 */
export const QueueTypeSpecificTabs: Record<number, QueueTabId[]> = {
	[QueueType.OFFLINE_QUEUE]: [
		QueueTabId.Processing,
		QueueTabId.Agents,
		QueueTabId.Skills,
		QueueTabId.Resources,
		QueueTabId.Buckets,
	],
	[QueueType.INBOUND_QUEUE]: [
		QueueTabId.Processing,
		QueueTabId.Agents,
		QueueTabId.Skills,
	],
	[QueueType.OUTBOUND_IVR_QUEUE]: [
		QueueTabId.Resources,
		QueueTabId.Buckets,
		QueueTabId.Amd,
	],
	[QueueType.PREVIEW_DIALER]: [
		QueueTabId.Processing,
		QueueTabId.Agents,
		QueueTabId.Skills,
		QueueTabId.Resources,
		QueueTabId.Buckets,
	],
	[QueueType.PROGRESSIVE_DIALER]: [
		QueueTabId.Processing,
		QueueTabId.Agents,
		QueueTabId.Skills,
		QueueTabId.Resources,
		QueueTabId.Buckets,
		QueueTabId.Amd,
	],
	[QueueType.PREDICTIVE_DIALER]: [
		QueueTabId.Processing,
		QueueTabId.Agents,
		QueueTabId.Skills,
		QueueTabId.Resources,
		QueueTabId.Buckets,
		QueueTabId.Amd,
	],
	[QueueType.CHAT_INBOUND_QUEUE]: [
		QueueTabId.Processing,
		QueueTabId.Agents,
		QueueTabId.Skills,
	],
	[QueueType.IM_CHAT_QUEUE]: [
		QueueTabId.Processing,
		QueueTabId.Agents,
		QueueTabId.Skills,
	],
	[QueueType.INBOUND_JOB_QUEUE]: [
		QueueTabId.Processing,
		QueueTabId.Agents,
		QueueTabId.Skills,
		QueueTabId.Buckets,
	],
	[QueueType.OUTBOUND_JOB_QUEUE]: [
		QueueTabId.Buckets,
	],
};
