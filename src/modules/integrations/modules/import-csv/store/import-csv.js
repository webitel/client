import { StorageImportSourceType } from 'webitel-sdk';
import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
// import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import ImportCsvAPI from '../api/importCsv';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    description: '',
    name: '',
    source: {},
    sourceType: StorageImportSourceType.Dialer,
    parameters: {
      charset: { name: 'UTF-8', value: 'utf-8' },
      separator: ',',
      skipHeaders: true,
      mappings: {
        name: {
          text: 'Name',
          required: true,
          csv: 'name',
        },
        timezone: {
          text: 'Timezone Id',
          required: false,
          csv: 'timezone',
        },
        priority: {
          text: 'Priority',
          required: false,
          csv: 0,
        },
        expireAt: {
          text: 'Expire At',
          name: 'expireAt',
          required: false,
          csv: 'expire',
        },
        bucket: {
          text: 'Bucket Id',
          required: false,
          csv: 'bucket',
        },
        variables: {
          text: 'Variables',
          required: false,
          multiple: true,
          csv: [{ text: 'variable' }],
        },
        commDestination: {
          text: 'Communication destination',
          required: true,
          multiple: true,
          csv: [{ text: 'destination' }],
        },
        commPriority: {
          text: 'Communication priority',
          required: false,
          multiple: true,
          csv: [{ text: 'priority' }],
        },
        commCode: {
          text: 'Communication code',
          required: true,
          multiple: true,
          csv: [{ text: 'code' }],
        },
        commDescription: {
          text: 'Communication description',
          required: false,
          multiple: true,
          csv: [{ text: 'description' }],
        },
      },
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

// const PERMISSIONS_API_URL = '/storage/import_csv';
// const permissions = new PermissionsStoreModule()
// .generateAPIActions(PERMISSIONS_API_URL)
// .getModule();

const importCsv = new ObjectStoreModule({ resettableState, headers })
.attachAPIModule(ImportCsvAPI)
.generateAPIActions()
// .setChildModules({ permissions })
.getModule({ actions });

export default importCsv;
