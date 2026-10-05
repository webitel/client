import { TeamFlowsAPI } from '@webitel/api-services/api';
import type { EngineTeamTrigger } from '@webitel/api-services/gen/models';
import { teamFlowSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { TeamFlowsNamespace } from '../namespace';

export const useTeamFlowsCardStore = createCardStore<EngineTeamTrigger>({
	namespace: `${TeamFlowsNamespace}/card`,
	apiModule: TeamFlowsAPI,
	standardValidationSchema,
});
