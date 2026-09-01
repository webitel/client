import { StorageServiceType } from '@webitel/api-services/gen/models';

const CognitiveProfileServices = Object.freeze([
	{
		locale: 'objects.tts',
		value: StorageServiceType.Tts,
	},
	{
		locale: 'objects.stt',
		value: StorageServiceType.Stt,
	},
]);

export default CognitiveProfileServices;
