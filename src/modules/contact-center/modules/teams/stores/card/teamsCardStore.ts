import { TeamsAPI } from '@webitel/api-services/api';
import type { EngineAgentTeam } from '@webitel/api-services/gen/models';
import { teamSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { TeamsNamespace } from '../namespace';

export const useTeamsCardStore = createCardStore<EngineAgentTeam>({
	namespace: `${TeamsNamespace}/card`,
	apiModule: TeamsAPI,
	standardValidationSchema,
});
