import { StorageProviderType } from '@webitel/api-services/gen/models';
import defaultCognitiveProfile from './defaultCognitiveProfile';

const elevenLabsCognitiveProfile = () => ({
	...defaultCognitiveProfile(),
	provider: StorageProviderType.ElevenLabs,
	properties: {
		key: '',
	},
});

export default elevenLabsCognitiveProfile;
