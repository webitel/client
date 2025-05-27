import { EngineSystemSettingName } from '@webitel/api-services';


const ConfigurationValueTypes = Object.freeze({
  [EngineSystemSettingName.EnableOmnichannel]: 'boolean',
  [EngineSystemSettingName.AmdCancelNotHuman]: 'boolean',
  [EngineSystemSettingName.Enable2fa]: 'boolean',
  [EngineSystemSettingName.MemberChunkSize]: 'number',
  [EngineSystemSettingName.SchemeVersionLimit]: 'number',
  [EngineSystemSettingName.SearchNumberLength]: 'number',
  [EngineSystemSettingName.ExportSettings]: 'select',
  ['labels_to_limit_contacts']: 'multiselect',
  [EngineSystemSettingName.PasswordRegExp]: 'string',
  [EngineSystemSettingName.PasswordValidationText]: 'string',
  [EngineSystemSettingName.ChatAiConnection]: 'string',
  [EngineSystemSettingName.AutolinkCallToContact]: 'boolean',
  [EngineSystemSettingName.IsFulltextSearchEnabled]: 'boolean',
  [EngineSystemSettingName.PeriodToPlaybackRecords]: 'number',
  [EngineSystemSettingName.WbtHideContact]: 'boolean',
  [EngineSystemSettingName.ShowFullContact]: 'boolean',
});

export default ConfigurationValueTypes;
