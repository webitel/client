export const FlowEditor = {
	Diagram: 'diagram',
	Code: 'code',
} as const;

export type FlowEditor = (typeof FlowEditor)[keyof typeof FlowEditor];
