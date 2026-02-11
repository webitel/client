import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import { formatDate } from '@webitel/ui-sdk/utils';

import ObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import UsersAPI from '../../../../users/api/users';
import staticHeaders from './_internals/headers';

const state = {
	fields: [
		'id',
		'name',
		'license',
	],
};

const actions = {
	INITIALIZE_HEADERS: (context) => {
		const licenses = context.rootState.directory.license.dataList;
		const licenseHeaders = licenses.map(({ id, product, notAfter }, index) => ({
			value: id,
			name: product,
			text: product.concat(` (${formatDate(+notAfter, FormatDateMode.DATE)})`),
			field: `license.${id}`,
			show: index < 5, // show only first 4 licenses
			sort: SortSymbols.NONE,
		}));
		const headers = [
			...staticHeaders,
			...licenseHeaders,
		];
		context.commit('SET_HEADERS', headers);
	},
	BEFORE_SET_DATA_LIST_HOOK: (context, { items, ...rest }) => {
		const licenseHeaders = context.state.headers.slice(1); // without "name" column
		const _items = items.map((item) => ({
			...item,
			_license: item.license || [], // save "default" format for api license patching
			license: licenseHeaders.reduce(
				(licenses, { value: licenseId }) => ({
					...licenses,
					[licenseId]: item.license?.some(({ id }) => id === licenseId),
				}),
				{},
			),
		}));
		return {
			items: _items,
			...rest,
		};
	},
	TOGGLE_USER_LICENSE: async (context, { user, license }) => {
		try {
			const licenseId = license.value; // "value" from license col header is its id
			const licenseIndex = user._license.findIndex(
				({ id }) => id === licenseId,
			);
			const changes = {
				license: [
					...user._license,
				],
			};
			if (licenseIndex !== -1) {
				changes.license.splice(licenseIndex, 1);
			} else {
				changes.license.push({
					id: licenseId,
				});
			}
			await context.dispatch('PATCH_ITEM', {
				id: user.id,
				changes,
			});
			/* i decided to mutate user directly to avoid all dataList redraw */

			user._license = changes.license;
			/* i decided to mutate user directly to avoid all dataList redraw */

			user.license[licenseId] = !user.license[licenseId];
		} catch (err) {
			throw err;
		}
	},
};

const license = new ObjectStoreModule({
	headers: staticHeaders,
})
	.attachAPIModule(UsersAPI)
	.generateAPIActions()
	.getModule({
		state,
		actions,
	});

export default license;
