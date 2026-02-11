import { EngineTriggerObjectType } from '@webitel/api-services/gen';

export interface TriggerObject {
	locale: string;
	value: EngineTriggerObjectType;
}

export const TriggerObjects: TriggerObject[] = [
	{
		locale: 'objects.integrations.triggers.cases',
		value: EngineTriggerObjectType.Cases,
	},
	{
		locale: 'objects.integrations.triggers.caseFiles',
		value: EngineTriggerObjectType.CaseFiles,
	},
	{
		locale: 'objects.integrations.triggers.caseComments',
		value: EngineTriggerObjectType.CaseComments,
	},
	{
		locale: 'objects.integrations.triggers.caseLinks',
		value: EngineTriggerObjectType.CaseLinks,
	},
	{
		locale: 'objects.integrations.triggers.relatedCases',
		value: EngineTriggerObjectType.RelatedCases,
	},
] as const;
