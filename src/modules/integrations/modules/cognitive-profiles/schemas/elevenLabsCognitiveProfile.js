import { StorageProviderType } from 'webitel-sdk';

import defaultCognitiveProfile from './defaultCognitiveProfile';

const elevenLabsCognitiveProfile = () => ({
	...defaultCognitiveProfile(),
	provider: StorageProviderType.ElevenLabs,
	properties: {
		key: '',
	},
});

export default elevenLabsCognitiveProfile;
