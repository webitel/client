import { QueueType } from '@webitel/ui-sdk/enums';

export default Object.keys(QueueType)
	.filter(
		(key) =>
			Number.isNaN(+key) &&
			// staging only https://webitel.atlassian.net/browse/WS-2
			(import.meta.env.VITE_STAGING_ENV === 'true' ||
				QueueType[key] !== QueueType.IM_CHAT_QUEUE),
	)
	.map((key) => ({
		name: key,
		value: `${QueueType[key]}`,
		locale: `objects.queue.type.${QueueType[key]}`,
	}));
