import { StorageProviderType } from '@webitel/api-services/gen/models';
import { MicrosoftLanguage } from 'webitel-sdk/enums';

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
