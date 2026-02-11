import { EngineTriggerObjectType } from '@webitel/api-services/gen';
import { EngineTriggerEventType } from 'webitel-sdk';

import { TriggerEvents } from './TriggerEvents.lookup';

function filterEventsByTypes(types: EngineTriggerEventType[]) {
	return TriggerEvents.filter((event) => types.includes(event.value));
}

export const TriggerEventsByObjectConfig = {
	[EngineTriggerObjectType.Cases]: filterEventsByTypes([
		EngineTriggerEventType.Create,
		EngineTriggerEventType.Update,
		EngineTriggerEventType.Remove,
		EngineTriggerEventType.ResolutionTime,
	]),
	[EngineTriggerObjectType.CaseComments]: filterEventsByTypes([
		EngineTriggerEventType.Create,
		EngineTriggerEventType.Update,
		EngineTriggerEventType.Remove,
	]),
	[EngineTriggerObjectType.CaseLinks]: filterEventsByTypes([
		EngineTriggerEventType.Create,
		EngineTriggerEventType.Update,
		EngineTriggerEventType.Remove,
	]),
	[EngineTriggerObjectType.CaseFiles]: filterEventsByTypes([
		EngineTriggerEventType.Create,
		EngineTriggerEventType.Remove,
	]),
	[EngineTriggerObjectType.RelatedCases]: filterEventsByTypes([
		EngineTriggerEventType.Create,
		EngineTriggerEventType.Remove,
	]),
} as const;
