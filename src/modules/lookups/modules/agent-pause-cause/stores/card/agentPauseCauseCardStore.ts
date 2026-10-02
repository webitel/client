import { AgentPauseCausesAPI } from '@webitel/api-services/api';
import type { EngineAgentPauseCause } from '@webitel/api-services/gen/models';
import { agentPauseCauseSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { AgentPauseCauseNamespace } from '../namespace';

export const useAgentPauseCauseCardStore =
	createCardStore<EngineAgentPauseCause>({
		namespace: `${AgentPauseCauseNamespace}/card`,
		apiModule: AgentPauseCausesAPI,
		standardValidationSchema,
	});
