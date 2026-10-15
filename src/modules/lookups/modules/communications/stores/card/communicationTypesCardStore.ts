import { CommunicationsAPI } from '@webitel/api-services/api';
import type { EngineCommunicationType } from '@webitel/api-services/gen/models';
import { communicationTypeSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { CommunicationTypesNamespace } from '../namespace';

export const useCommunicationTypesCardStore =
	createCardStore<EngineCommunicationType>({
		namespace: `${CommunicationTypesNamespace}/card`,
		apiModule: CommunicationsAPI,
		standardValidationSchema,
	});
