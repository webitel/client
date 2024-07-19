import { EngineSystemSettingName } from 'webitel-sdk';

const ConfigurationValueTypes = Object.freeze({
    [EngineSystemSettingName.EnableOmnichannel]: 'boolean',
    [EngineSystemSettingName.AmdCancelNotHuman]: 'boolean',
    [EngineSystemSettingName.Enable2fa]: 'boolean',
    [EngineSystemSettingName.MemberChunkSize]: 'number',
    [EngineSystemSettingName.SchemeVersionLimit]: 'number',
    [EngineSystemSettingName.SearchNumberLength]: 'number',
    [EngineSystemSettingName.ExportSettings]: 'select',
    [EngineSystemSettingName.PasswordRegExp]: 'string',
    [EngineSystemSettingName.PasswordValidationText]: 'string',
    [EngineSystemSettingName.ChatAiConnection]: 'string',
  },
);

export default ConfigurationValueTypes;
