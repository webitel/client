import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import UsersAPI from '../../../../users/api/users';
import LicenseUsersAPI from '../api/licenseUsers';
import headers from './_internals/headers';

const state = {
	// fields: ['id', 'name', 'license'],
};

const actions = {
	LOGOUT_USER: async (context, _user) => {
		try {
			await UsersAPI.logoutUser(_user);
			const thisUser = context.state.dataList.find(
				({ user }) => user === _user,
			);
			/* i decided to mutate user directly to avoid all dataList redraw */
			thisUser.sessions = 0;
		} catch (err) {
			throw err;
		}
	},
};

const license = new NestedObjectStoreModule({
	headers,
})
	.attachAPIModule(LicenseUsersAPI)
	.generateAPIActions()
	.getModule({
		state,
		actions,
	});

export default license;
