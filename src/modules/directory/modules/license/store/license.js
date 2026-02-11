import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import LicenseAPI from '../api/license';
import licenseUsers from '../modules/license-users/store/licenseUsers';
import users from '../modules/users/store/users';
import headers from './_internals/headers';

const actions = {
	AFTER_SET_DATA_LIST_HOOK: (context, payload) => {
		context.dispatch('directory/license/users/INITIALIZE_HEADERS', null, {
			root: true,
		});
		return payload;
	},

	UPD_ITEM: (context, certificate) => LicenseAPI.update(certificate),
	UPDATE_ITEM: async (context, payload) => {
		await context.dispatch('UPD_ITEM', payload);
		context.dispatch('LOAD_DATA_LIST');
	},
};

const license = new ObjectStoreModule({
	headers,
})
	.attachAPIModule(LicenseAPI)
	.generateAPIActions()
	.setChildModules({
		users,
		licenseUsers,
	})
	.getModule({
		actions,
	});

export default license;
