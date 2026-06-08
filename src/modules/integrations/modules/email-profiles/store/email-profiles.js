import { EngineEmailAuthType } from 'webitel-sdk';

import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
// import PermissionsStoreModule
//   from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import EmailProfilesAPI from '../api/emailProfiles';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		description: '',
		domainId: '',
		enabled: true,
		imapHost: '',
		smtpHost: '',
		fetchInterval: 60,
		imapPort: 993,
		login: '',
		mailbox: '',
		name: '',
		password: '',
		schema: {},
		smtpPort: 587,
		authType: EngineEmailAuthType.Plain,
		listen: false,
		logged: false,
		params: {
			oauth2: {
				clientId: '',
				clientSecret: '',
				redirectUrl: '',
			},
		},
	},
};

const actions = {
	AUTH: async (context) => {
		const { itemInstance } = context.state;
		if (itemInstance.logged) {
			await EmailProfilesAPI.logout({
				id: itemInstance.id,
			});
			await context.dispatch('LOAD_ITEM');
		} else {
			const { redirect_url } = await EmailProfilesAPI.login({
				id: itemInstance.id,
			});
			if (redirect_url) window.parent.location.replace(redirect_url);
		}
	},
};

// const PERMISSIONS_API_URL = '/storage/email_profiles';
// const permissions = new PermissionsStoreModule()
// .generateAPIActions(PERMISSIONS_API_URL)
// .getModule();

const skills = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(EmailProfilesAPI)
	.generateAPIActions()
	// .setChildModules({ permissions })
	.getModule({
		actions,
	});

export default skills;
