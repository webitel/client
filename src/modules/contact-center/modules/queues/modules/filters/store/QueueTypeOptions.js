import { QueueType } from '@webitel/ui-sdk/enums';

export default Object.keys(QueueType)

	.filter((key) => Number.isNaN(+key))
	.map((key) => ({
		name: key,
		value: `${QueueType[key]}`,
		locale: `objects.queue.type.${QueueType[key]}`,
	}));
