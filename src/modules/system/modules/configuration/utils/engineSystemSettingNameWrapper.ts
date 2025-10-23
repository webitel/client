import { EngineSystemSettingName as OriginalEngineSystemSettingName } from '@webitel/api-services/gen/models';

// TODO: remove hardcoded value as soon as api generation is fixed
export const EngineSystemSettingName = {
  ...OriginalEngineSystemSettingName,
  PasswordWarningDays: 'password_warning_days',
} as const;

export default EngineSystemSettingName;
