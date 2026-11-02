import { CognitiveProfilesAPI } from '@webitel/api-services/api';
import {
	type CognitiveProfileCard,
	cognitiveProfileSchema as standardValidationSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { CognitiveProfilesNamespace } from '../namespace';

export const useCognitiveProfileCardStore =
	createCardStore<CognitiveProfileCard>({
		namespace: `${CognitiveProfilesNamespace}/card`,
		apiModule: CognitiveProfilesAPI,
		standardValidationSchema,
	});
