import { ChangelogsAPI } from '@webitel/api-services/api';
import {
	type ChangelogCard,
	changelogSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { ChangelogsNamespace } from '../namespace';

export const useChangelogsCardStore = createCardStore<ChangelogCard>({
	namespace: `${ChangelogsNamespace}/card`,
	apiModule: ChangelogsAPI,
	standardValidationSchema: changelogSchema,
});
