import { EngineSystemSettingName } from "webitel-sdk";

const ConfigurationValueTypes = Object.freeze({
  [EngineSystemSettingName.EnableOmnichannel]: "boolean",
  [EngineSystemSettingName.AmdCancelNotHuman]: "boolean",
  [EngineSystemSettingName.Enable2fa]: "boolean",
  [EngineSystemSettingName.MemberChunkSize]: "number",
  [EngineSystemSettingName.SchemeVersionLimit]: "number",
});

export default ConfigurationValueTypes;
