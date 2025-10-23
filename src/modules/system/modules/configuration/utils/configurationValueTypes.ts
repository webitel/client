// TODO: remove hardcoded value as soon as api generation is fixed
// use import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import EngineSystemSettingName from './engineSystemSettingNameWrapper';

const ConfigurationValueTypes = {
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
  [EngineSystemSettingName.ScreenshotInterval]: 'number',

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

  // Password settings
  [EngineSystemSettingName.PasswordExpiryDays]: 'number',
  [EngineSystemSettingName.PasswordMinLength]: 'number',
  [EngineSystemSettingName.PasswordCategories]: 'multiselect',
  [EngineSystemSettingName.PasswordContainsUsername]: 'boolean',
  [EngineSystemSettingName.PasswordWarningDays]: 'number',
} as const;

export default ConfigurationValueTypes;

