import { CognitiveProfilesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { CognitiveProfilesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useCognitiveProfilesDatalistStore = createTableStore(
	`${CognitiveProfilesNamespace}/datalist`,
	{
		apiModule: CognitiveProfilesAPI,
		headers,
	},
);
