/** the labels the AI answering-machine detector can report */
const AmdAiLabels = [
	'human',
	'silence',
	'ringback',
	'voicemail',
] as const;

export default AmdAiLabels;
