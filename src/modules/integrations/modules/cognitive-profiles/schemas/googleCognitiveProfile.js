import { StorageProviderType } from 'webitel-sdk';
import { MicrosoftLanguage } from 'webitel-sdk/esm2015/enums';

import defaultCognitiveProfile from './defaultCognitiveProfile';

const googleCognitiveProfile = () => ({
	...defaultCognitiveProfile(),
	provider: StorageProviderType.Google,
	properties: {
		key: '',
		locale: MicrosoftLanguage['en-US'],
	},
});

export default googleCognitiveProfile;
