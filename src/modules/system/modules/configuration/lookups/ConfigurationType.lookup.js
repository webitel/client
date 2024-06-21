import { EngineSystemSettingName } from 'webitel-sdk';

const ConfigurationTypeLookup = Object.freeze({
  [EngineSystemSettingName.EnableOmnichannel]: {
    controls: [
      'defaultBooleanConfig',
    ],
  },
  [EngineSystemSettingName.AmdCancelNotHuman]: {
    controls: [
      'defaultBooleanConfig',
    ],
  },
  [EngineSystemSettingName.Enable2fa]: {
    controls: [
      'defaultBooleanConfig',
    ],
  },
  [EngineSystemSettingName.MemberChunkSize]: {
    controls: [
      'defaultNumberConfig',
    ],
  },
  [EngineSystemSettingName.SearchNumberLength]: {
    controls: [
      'defaultNumberConfig',
    ],
  },
  [EngineSystemSettingName.SchemeVersionLimit]: {
    controls: [
      'defaultNumberConfig',
    ],
  },
  [EngineSystemSettingName.ExportSettings]: {
    controls: [
      'defaultSelectConfig',
    ],
  },
});

export default ConfigurationTypeLookup;
