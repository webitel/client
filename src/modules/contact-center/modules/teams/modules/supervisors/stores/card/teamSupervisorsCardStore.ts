import { teamAgentSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { TeamSupervisorsAPI } from '../../api/teamSupervisors';
import { TeamSupervisorsNamespace } from '../namespace';

export const useTeamSupervisorsCardStore = createCardStore({
	namespace: `${TeamSupervisorsNamespace}/card`,
	apiModule: TeamSupervisorsAPI,
	standardValidationSchema,
});
