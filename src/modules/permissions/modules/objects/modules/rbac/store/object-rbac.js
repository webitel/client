import { PermissionsStoreModule } from '../../../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import {
	getObjclassDefaultList,
	patchObjclassDefaultMode,
} from '../api/objectsRbac';
import headers from './_internals/headers';

const actions = {
	GET_LIST: (context) => getObjclassDefaultList(context.state),
	PATCH_ACCESS_MODE: (context, { item, changes }) =>
		patchObjclassDefaultMode({
			...context.state,
			id: +item.grantor.id,
			changes: [
				changes,
			],
		}),

	ADD_ROLE_PERMISSIONS: async (context, { grantee, grantor }) => {
		const changes = {
			grantor: +grantor.id,
			grantee: +grantee.id,
			granted: 'r',
		};
		const item = {
			grantor,
			grantee,
		};
		try {
			await context.dispatch('PATCH_ACCESS_MODE', {
				item,
				changes,
			});
		} catch (err) {
			throw err;
		} finally {
			context.dispatch('LOAD_DATA_LIST');
		}
	},
};

const rbac = new PermissionsStoreModule({
	headers,
}).getModule({
	actions,
});

export default rbac;
