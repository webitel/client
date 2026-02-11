import { StorageProviderType } from 'webitel-sdk';
import { MicrosoftLanguage } from 'webitel-sdk/esm2015/enums';
import { MicrosoftRegion } from 'webitel-sdk/esm2015/lookups';

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
