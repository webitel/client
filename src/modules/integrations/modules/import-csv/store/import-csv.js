import { StorageImportSourceType } from 'webitel-sdk';

import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import ImportCsvAPI from '../api/importCsv';
import ImportCsvMemberMappings from '../lookups/ImportCsvMemberMappings.lookup';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		description: '',
		name: '',
		source: {},
		sourceType: StorageImportSourceType.Dialer,
		parameters: {
			charset: {
				name: 'UTF-8',
				value: 'utf-8',
			},
			separator: ',',
			skipHeaders: true,
			clearMembers: false,
			mappings: Object.entries(ImportCsvMemberMappings).reduce(
				(mappings, [name, { csv }]) => ({
					...mappings,
					[name]: csv,
				}),
				{},
			),
		},
	},
};

const actions = {
	SET_ITEM_PARAMETERS_PROP: (context, { prop, value }) => {
		const parameters = {
			...context.state.itemInstance.parameters,
			[prop]: value,
		};
		return context.dispatch('SET_ITEM_PROPERTY', {
			prop: 'parameters',
			value: parameters,
		});
	},
};

const PERMISSIONS_API_URL = '/storage/import_templates';
const permissions = new PermissionsStoreModule()
	.generateAPIActions(PERMISSIONS_API_URL)
	.getModule();

const importCsv = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(ImportCsvAPI)
	.generateAPIActions()
	.setChildModules({
		permissions,
	})
	.getModule({
		actions,
	});

export default importCsv;
