import { FlowsAPI } from '@webitel/api-services/api';
import {
	type FlowCard,
	flowSchema as standardValidationSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { FlowNamespace } from '../namespace';

export const useFlowCardStore = createCardStore<FlowCard>({
	namespace: `${FlowNamespace}/card`,
	apiModule: FlowsAPI,
	standardValidationSchema,
});
