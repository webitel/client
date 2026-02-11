import { EngineTriggerEventType } from 'webitel-sdk';

export interface TriggerEvent {
	locale: string;
	value: EngineTriggerEventType;
}

export const TriggerEvents: TriggerEvent[] = [
	{
		locale: 'reusable.create',
		value: EngineTriggerEventType.Create,
	},
	{
		locale: 'reusable.update',
		value: EngineTriggerEventType.Update,
	},
	{
		locale: 'reusable.delete',
		value: EngineTriggerEventType.Remove,
	},
	{
		locale: 'objects.integrations.triggers.resolutionTime',
		value: EngineTriggerEventType.ResolutionTime,
	},
] as const;
