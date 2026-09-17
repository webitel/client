import { UsersAPI } from '@webitel/api-services/api';
import type { ApiLicenseUser, ApiUser } from '@webitel/api-services/gen/models';
import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { createTableStore } from '@webitel/ui-datalist';
import { unref } from 'vue';

import { LicenseNamespace } from '../namespace';
import { byUserStaticHeaders } from './_internals/byUserStaticHeaders';

export type LicenseByUserRow = Omit<ApiUser, 'license'> & {
	/** Original license array from API — used when patching toggles. */
	_license: Array<Pick<ApiLicenseUser, 'id'>>;
	/** Checkbox map keyed by license id. */
	license: Record<string, boolean>;
};

const transformUsersForLicenseColumns = (
	items: ApiUser[],
	headers: DatalistTableHeader[],
): LicenseByUserRow[] => {
	const licenseHeaders = headers.slice(1);

	return items.map((item) => ({
		...item,
		_license: item.license || [],
		license: licenseHeaders.reduce<Record<string, boolean>>(
			(licenses, { value: licenseId }) => {
				licenses[licenseId] =
					item.license?.some(({ id }) => id === licenseId) ?? false;
				return licenses;
			},
			{},
		),
	}));
};

/**
 * Licenses-by-user matrix. Headers are dynamic (one column per product) —
 * seeded with the static name column, then replaced via `updateShownHeaders`
 * before `initialize()`. Persistence off so stale license field ids do not linger.
 */
export const useLicenseByUserDatalistStore = createTableStore(
	`${LicenseNamespace}/byUser/datalist`,
	{
		apiModule: {
			getList: async (params: Record<string, unknown>) => {
				// Force the fields the Users list endpoint expects; header `field`
				// values are `license.<id>` for column identity, not API fields.
				const { items, next } = await UsersAPI.getList({
					...params,
					search: (params.q as string) ?? (params.search as string),
					fields: [
						'id',
						'name',
						'license',
					],
				});

				// Read headers at call time so dynamic license columns are applied.
				const store = useLicenseByUserDatalistStore();

				return {
					items: transformUsersForLicenseColumns(items, unref(store.headers)),
					next,
				};
			},
		},
		headers: byUserStaticHeaders,
		disablePersistence: true,
	},
);
