import { DevicesAPI } from '@webitel/api-services/api';
import type { ApiDevice } from '@webitel/api-services/gen/models';
import { deviceSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { DevicesNamespace } from '../namespace';

/**
 * Regular devices must not send `hotdesk`/`hotdesks` (zod defaults + getDevice
 * merge put `false`/`[]` on every draft). Drop until @webitel/api-services
 * ships the same strip in DevicesAPI.preRequestHandler [WTEL-10460].
 */
const omitHotdeskFieldsUnlessEnabled = (item: ApiDevice): ApiDevice => {
	if (item.hotdesk) return item;
	const { hotdesk: _hotdesk, hotdesks: _hotdesks, ...rest } = item;
	return rest;
};

const devicesCardApi = {
	...DevicesAPI,
	add: ({ itemInstance, ...rest }: Parameters<typeof DevicesAPI.add>[0]) =>
		DevicesAPI.add({
			...rest,
			itemInstance: omitHotdeskFieldsUnlessEnabled(itemInstance as ApiDevice),
		}),
	update: ({
		itemInstance,
		...rest
	}: Parameters<typeof DevicesAPI.update>[0]) =>
		DevicesAPI.update({
			...rest,
			itemInstance: omitHotdeskFieldsUnlessEnabled(itemInstance as ApiDevice),
		}),
};

export const useDevicesCardStore = createCardStore<ApiDevice>({
	namespace: `${DevicesNamespace}/card`,
	apiModule: devicesCardApi,
	standardValidationSchema,
});
