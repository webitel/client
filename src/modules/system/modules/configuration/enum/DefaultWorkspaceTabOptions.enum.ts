export const DefaultWorkspaceTabOptions = {
  TaskProcessing: 'task_processing',
  ClientInfo: 'client_info',
} as const;

export type DefaultWorkspaceTabOptions = (typeof DefaultWorkspaceTabOptions)[keyof typeof DefaultWorkspaceTabOptions];