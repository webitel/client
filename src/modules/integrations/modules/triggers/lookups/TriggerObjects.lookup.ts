// import { EngineTriggerObjectType } from 'webitel-sdk';
import { EngineTriggerObjectType } from '@webitel/api-services/gen'

export interface TriggerObject {
  locale: string;
  value: EngineTriggerObjectType;
}

export const TriggerObjects: TriggerObject[] = [
  {
    locale: 'objects.integrations.triggers.cases',
    value: EngineTriggerObjectType.cases,
  },
] as const;
