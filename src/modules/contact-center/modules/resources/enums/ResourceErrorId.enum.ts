export const ResourceErrorId = {
	Provisional: '1xx',
	Success: '2xx',
	Redirection: '3xx',
	ClientFailure: '4xx',
	ServerFailure: '5xx',
} as const;

export type ResourceErrorId =
	(typeof ResourceErrorId)[keyof typeof ResourceErrorId];
