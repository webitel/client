import { EngineSystemSettingName } from 'webitel-sdk';

const SettingsValueTypes = Object.freeze([
  { name: EngineSystemSettingName.EnableOmnichannel, type: 'boolean' },
  { name: EngineSystemSettingName.MemberChunkSize, type: 'number' },
]);

export default SettingsValueTypes;
