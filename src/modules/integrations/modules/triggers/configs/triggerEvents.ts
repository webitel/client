import { EngineTriggerObjectType } from '@webitel/api-services/gen';
import { EngineTriggerEventType } from '@webitel/api-services/gen/models';

/** [Claude] the label of each event a trigger can run on */
const triggerEventLocale: Partial<Record<EngineTriggerEventType, string>> = {
	[EngineTriggerEventType.Create]: 'reusable.create',
	[EngineTriggerEventType.Update]: 'reusable.update',
	[EngineTriggerEventType.Remove]: 'reusable.delete',
	[EngineTriggerEventType.ResolutionTime]:
		'objects.integrations.triggers.resolutionTime',
	[EngineTriggerEventType.RecordCall]:
		'objects.integrations.triggers.recordCall',
};

/** [Claude] the events each object has */
const triggerEventsByObject: Partial<
	Record<EngineTriggerObjectType, EngineTriggerEventType[]>
> = {
	[EngineTriggerObjectType.Cases]: [
		EngineTriggerEventType.Create,
		EngineTriggerEventType.Update,
		EngineTriggerEventType.Remove,
		EngineTriggerEventType.ResolutionTime,
	],
	[EngineTriggerObjectType.CaseComments]: [
		EngineTriggerEventType.Create,
		EngineTriggerEventType.Update,
		EngineTriggerEventType.Remove,
	],
	[EngineTriggerObjectType.CaseLinks]: [
		EngineTriggerEventType.Create,
		EngineTriggerEventType.Update,
		EngineTriggerEventType.Remove,
	],
	[EngineTriggerObjectType.CaseFiles]: [
		EngineTriggerEventType.Create,
		EngineTriggerEventType.Remove,
	],
	[EngineTriggerObjectType.RelatedCases]: [
		EngineTriggerEventType.Create,
		EngineTriggerEventType.Remove,
	],
	[EngineTriggerObjectType.Call]: [
		EngineTriggerEventType.RecordCall,
	],
};

/** [Claude] the event options of an object, for the event select */
export const getTriggerEventOptions = (object?: string) =>
	(triggerEventsByObject[object as EngineTriggerObjectType] ?? []).map(
		(value) => ({
			value,
			locale: triggerEventLocale[value],
		}),
	);
