import { EngineSystemSettingName } from 'webitel-sdk';

const ConfigurationValueTypes = Object.freeze({
  [EngineSystemSettingName.EnableOmnichannel]: 'boolean',
  [EngineSystemSettingName.AmdCancelNotHuman]: 'boolean',
  [EngineSystemSettingName.Enable2fa]: 'boolean',
  [EngineSystemSettingName.MemberChunkSize]: 'number',
  [EngineSystemSettingName.SchemeVersionLimit]: 'number',
  [EngineSystemSettingName.SearchNumberLength]: 'number',
  [EngineSystemSettingName.ExportSettings]: 'select',
  //TODO: remove after migration to new EngineSystemSettingName enum https://webitel.atlassian.net/browse/WTEL-6827
  ['labels_to_limit_contacts']: 'multiselect',
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
  // TODO remove after added to EngineSystemSettingName enum
  ['new_message_sound_notification']: 'boolean',
  ['new_chat_sound_notification']: 'boolean',
});

export default ConfigurationValueTypes;
