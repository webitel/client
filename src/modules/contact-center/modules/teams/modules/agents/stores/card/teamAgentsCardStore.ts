import { teamAgentSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { TeamAgentsAPI } from '../../api/teamAgents';
import { TeamAgentsNamespace } from '../namespace';

export const useTeamAgentsCardStore = createCardStore({
	namespace: `${TeamAgentsNamespace}/card`,
	apiModule: TeamAgentsAPI,
	standardValidationSchema,
});
