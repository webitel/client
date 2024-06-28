import WebitelApplications from "@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum";
import UserinfoStoreModule from "@webitel/ui-sdk/src/modules/Userinfo/store/UserinfoStoreModule";
import NavigationPages from "../../../app/router/_internals/NavigationPages.lookup";
import convertScope from "./_internals/scripts/convertScope";

const state = {
	thisApp: WebitelApplications.ADMIN,
};

const getters = {
	ACCESSIBLE_NAV: (state, getters) =>
		NavigationPages.reduce((accumulator, nav) => {
			const subNav = nav.subNav.filter((subNav) =>
				getters.HAS_READ_ACCESS({ name: subNav.value }),
			);
			if (subNav.length) {
				const newNav = { ...nav, subNav };
				return [...accumulator, newNav];
			}
			return accumulator;
		}, []),

	IS_CHANGE_USER_PASSWORD_ALLOW: (state) =>
		!!state.permissions.change_user_password,
};

const actions = {
	CONVERT_USER_SCOPE: (context, scope) => convertScope(scope),
};

const userinfo = new UserinfoStoreModule().getModule({
	state,
	getters,
	actions,
});

export default userinfo;
