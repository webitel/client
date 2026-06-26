import { StorageProviderType } from 'webitel-sdk';
import { MicrosoftLanguage, MicrosoftRegion } from 'webitel-sdk/enums';

import defaultCognitiveProfile from './defaultCognitiveProfile';

const microsoftCognitiveProfile = () => ({
	...defaultCognitiveProfile(),
	provider: StorageProviderType.Microsoft,
	properties: {
		key: '',
		region: MicrosoftRegion[0],
		locale: MicrosoftLanguage['en-US'],
	},
});

export default microsoftCognitiveProfile;
