import { AgentsAPI } from '@webitel/api-services/api';
import type { EngineAgent } from '@webitel/api-services/gen/models';
import { agentSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { AgentsNamespace } from '../namespace';

export const useAgentsCardStore = createCardStore<EngineAgent>({
	namespace: `${AgentsNamespace}/card`,
	apiModule: AgentsAPI,
	standardValidationSchema,
});
