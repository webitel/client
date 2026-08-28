import { EngineTriggerType } from '@webitel/api-services/gen/models';

export interface TriggerType {
	locale: string;
	value: EngineTriggerType;
}

export const TriggerTypes: TriggerType[] = [
	{
		locale: 'objects.integrations.triggers.cron',
		value: EngineTriggerType.Cron,
	},
	{
		locale: 'objects.integrations.triggers.event',
		value: EngineTriggerType.Event,
	},
] as const;
