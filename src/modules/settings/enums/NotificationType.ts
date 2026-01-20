import { EngineSystemSettingName } from '@webitel/api-services/gen/models';

export const NotificationType = {
  NewMessageSound: EngineSystemSettingName.NewMessageSoundNotification,
  NewChatSound: EngineSystemSettingName.NewChatSoundNotification,
  ChatEndSound: EngineSystemSettingName.ChatEndSoundNotification,
  CallEndSound: EngineSystemSettingName.CallEndSoundNotification,
  TaskEndSound: EngineSystemSettingName.TaskEndSoundNotification,
  ChatEndPush: EngineSystemSettingName.ChatEndPushNotification,
  CallEndPush: EngineSystemSettingName.CallEndPushNotification,
  TaskEndPush: EngineSystemSettingName.TaskEndPushNotification,
  SocketCloseSound: 'socketCloseSound',  // there is no key for it in EngineSystemSettingName
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType]; 