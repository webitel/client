export const AmdAiLabel = {
	Human: 'human',
	Silence: 'silence',
	Ringback: 'ringback',
	Voicemail: 'voicemail',
} as const;

export type AmdAiLabel = (typeof AmdAiLabel)[keyof typeof AmdAiLabel];
