import { QueueType } from '@webitel/ui-sdk/enums';

export default Object.keys(QueueType)

	.filter(
		(key) =>
			Number.isNaN(+key) /* && QueueType[key] !== QueueType.IM_CHAT_QUEUE */, // hide me https://webitel.atlassian.net/browse/WS-2
	)
	.map((key) => ({
		name: key,
		value: `${QueueType[key]}`,
		locale: `objects.queue.type.${QueueType[key]}`,
	}));
