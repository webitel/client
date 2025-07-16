import { EngineSystemSettingName } from '@webitel/api-services/gen/models';

const ConfigurationValueTypes = Object.freeze({
  [EngineSystemSettingName.EnableOmnichannel]: 'boolean',
  [EngineSystemSettingName.AmdCancelNotHuman]: 'boolean',
  [EngineSystemSettingName.Enable_2fa]: 'boolean',
  [EngineSystemSettingName.MemberChunkSize]: 'number',
  [EngineSystemSettingName.SchemeVersionLimit]: 'number',
  [EngineSystemSettingName.SearchNumberLength]: 'number',
  [EngineSystemSettingName.ExportSettings]: 'select',
  [EngineSystemSettingName.LabelsToLimitContacts]: 'multiselect',
  [EngineSystemSettingName.PasswordRegExp]: 'string',
  [EngineSystemSettingName.PasswordValidationText]: 'string',
  [EngineSystemSettingName.ChatAiConnection]: 'string',
  [EngineSystemSettingName.AutolinkCallToContact]: 'boolean',
  [EngineSystemSettingName.IsFulltextSearchEnabled]: 'boolean',
  [EngineSystemSettingName.PeriodToPlaybackRecords]: 'number',
  [EngineSystemSettingName.WbtHideContact]: 'boolean',
  [EngineSystemSettingName.ShowFullContact]: 'boolean',

  // Notification
  [EngineSystemSettingName.CallEndSoundNotification]: 'boolean',
  [EngineSystemSettingName.CallEndPushNotification]: 'boolean',
  [EngineSystemSettingName.ChatEndSoundNotification]: 'boolean',
  [EngineSystemSettingName.ChatEndPushNotification]: 'boolean',
  [EngineSystemSettingName.TaskEndSoundNotification]: 'boolean',
  [EngineSystemSettingName.TaskEndPushNotification]: 'boolean',
  [EngineSystemSettingName.PushNotificationTimeout]: 'number',
  [EngineSystemSettingName.NewMessageSoundNotification]: 'boolean',
  [EngineSystemSettingName.NewChatSoundNotification]: 'boolean',
});

export default ConfigurationValueTypes;
