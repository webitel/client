import { AgentSubordinatesAPI } from '@webitel/api-services/api';
import { agentSubordinateSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { AgentSubordinatesNamespace } from '../namespace';

export const useAgentSubordinatesCardStore = createCardStore({
	namespace: `${AgentSubordinatesNamespace}/card`,
	apiModule: AgentSubordinatesAPI,
	standardValidationSchema,
});
