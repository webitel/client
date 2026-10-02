import { agentSubordinateSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { AgentSubordinatesAPI } from '../../api/agentSubordinates';
import { AgentSubordinatesNamespace } from '../namespace';

export const useAgentSubordinatesCardStore = createCardStore({
	namespace: `${AgentSubordinatesNamespace}/card`,
	apiModule: AgentSubordinatesAPI,
	standardValidationSchema,
});
