import { EngineSystemSettingName } from 'webitel-sdk';

const SettingsValueTypes = Object.freeze({
    [EngineSystemSettingName.EnableOmnichannel]: 'boolean',
    [EngineSystemSettingName.MemberChunkSize]: 'number',
  },
);

export default SettingsValueTypes;
