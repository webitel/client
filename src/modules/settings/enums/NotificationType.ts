export const NotificationType = {
  CallEndSound: 'callEndSound',
  SocketCloseSound: 'socketCloseSound',
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType]; 