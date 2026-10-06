import { OutboundResourceGroupsAPI } from '@webitel/api-services/api';
import type { EngineOutboundResourceGroup } from '@webitel/api-services/gen/models';
import {
	resourceGroupSchema as standardValidationSchema,
	type TimeRange,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { ResourceGroupsNamespace } from '../namespace';

export type ResourceGroupCard = Omit<EngineOutboundResourceGroup, 'time'> & {
	time?: TimeRange[];
};

export const useResourceGroupsCardStore = createCardStore<ResourceGroupCard>({
	namespace: `${ResourceGroupsNamespace}/card`,
	apiModule: OutboundResourceGroupsAPI,
	standardValidationSchema,
});
