import { EngineTriggerObjectType } from 'webitel-sdk';

export interface TriggerObject {
  locale: string;
  value: EngineTriggerObjectType;
}

export const TriggerObjects: TriggerObject[] = [
  {
    locale: 'objects.integrations.triggers.cases',
    value: EngineTriggerObjectType.Case,
  },
] as const;
