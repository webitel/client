import { EngineTriggerEventType } from 'webitel-sdk';

export interface TriggerEvent {
  locale: string;
  value: EngineTriggerEventType;
}

export const TriggerEvents: TriggerEvent[] = [
  {
    locale: 'objects.integrations.triggers.create',
    value: EngineTriggerEventType.Create,
  },
  {
    locale: 'objects.integrations.triggers.update',
    value: EngineTriggerEventType.Update,
  },
  {
    locale: 'objects.integrations.triggers.delete',
    value: EngineTriggerEventType.Delete,
  },
] as const;
