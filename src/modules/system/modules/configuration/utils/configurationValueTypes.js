import { EngineSystemSettingName } from 'webitel-sdk';

const ConfigurationValueTypes = Object.freeze({
    [EngineSystemSettingName.EnableOmnichannel]: 'boolean',
    [EngineSystemSettingName.MemberChunkSize]: 'number',
  },
);

export default ConfigurationValueTypes;
