/** [Claude] the chat gateway's message templates: the keys of its `updates` */
export const ChatGatewayTemplate = {
	Title: 'title',
	Join: 'join',
	Close: 'close',
	Left: 'left',
	FilePolicyFail: 'filePolicyFail',
} as const;

export type ChatGatewayTemplate =
	(typeof ChatGatewayTemplate)[keyof typeof ChatGatewayTemplate];
