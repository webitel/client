import { BlacklistNumbersAPI } from '@webitel/api-services/api';
import type { EngineListCommunication } from '@webitel/api-services/gen/models';
import { blacklistNumberSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { BlacklistNumbersNamespace } from '../namespace';

/* [Claude] backend sends expireAt as an int64 string, the datepicker writes a number */
export type BlacklistNumberCard = Omit<EngineListCommunication, 'expireAt'> & {
	expireAt?: string | number;
};

export const useBlacklistNumbersCardStore =
	createCardStore<BlacklistNumberCard>({
		namespace: `${BlacklistNumbersNamespace}/card`,
		apiModule: BlacklistNumbersAPI,
		standardValidationSchema,
	});
