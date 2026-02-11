import deepMerge from 'deepmerge';
import { StorageProviderType } from 'webitel-sdk';

import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import CognitiveProfilesAPI from '../api/cognitiveProfiles';
import defaultCognitiveProfile from '../schemas/defaultCognitiveProfile';
import elevenLabsCognitiveProfile from '../schemas/elevenLabsCognitiveProfile';
import googleCognitiveProfile from '../schemas/googleCognitiveProfile';
import microsoftCognitiveProfile from '../schemas/microsoftCognitiveProfile';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		...defaultCognitiveProfile(),
	},
};

const stateMap = {
	[StorageProviderType.Microsoft]: microsoftCognitiveProfile,
	[StorageProviderType.Google]: googleCognitiveProfile,
	[StorageProviderType.ElevenLabs]: elevenLabsCognitiveProfile,
};

const actions = {
	LOAD_ITEM: async (context, type) => {
		let typedItem;
		if (context.state.itemId) {
			const item = await context.dispatch('GET_ITEM');
			typedItem = deepMerge(stateMap[item.provider](), item);
		} else {
			typedItem = stateMap[type]();
		}
		context.commit('SET_ITEM', typedItem);
	},
	SET_ITEM_PROPERTIES_PROP: (context, { prop, value }) => {
		const properties = {
			...context.state.itemInstance.properties,
			[prop]: value,
		};
		return context.dispatch('SET_ITEM_PROPERTY', {
			prop: 'properties',
			value: properties,
		});
	},
};

const PERMISSIONS_API_URL = '/storage/cognitive_profiles';
const permissions = new PermissionsStoreModule()
	.generateAPIActions(PERMISSIONS_API_URL)
	.getModule();

const skills = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(CognitiveProfilesAPI)
	.generateAPIActions()
	.setChildModules({
		permissions,
	})
	.getModule({
		actions,
	});

export default skills;
