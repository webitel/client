import { StorageServiceType } from 'webitel-sdk';

const CognitiveProfileServices = Object.freeze([
	{
		locale: 'objects.tts',
		value: StorageServiceType.TTS,
	},
	{
		locale: 'objects.stt',
		value: StorageServiceType.STT,
	},
]);

export default CognitiveProfileServices;
