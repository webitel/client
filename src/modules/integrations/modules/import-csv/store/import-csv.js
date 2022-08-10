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
      clearMembers: false,
      mappings: {
        name: {
          locale: 'reusable.name',
          required: true,
          csv: 'name',
        },
        timezoneId: {
          locale: 'objects.lookups.calendars.timezone',
          required: false,
          csv: 'timezone',
        },
        priority: {
          locale: 'vocabulary.priority',
          required: false,
          csv: 'priority',
        },
        expireAt: {
          locale: 'objects.ccenter.queues.expire',
          required: false,
          csv: 'expire',
        },
        bucketId: {
          locale: ['objects.lookups.buckets.buckets', 1],
          required: false,
          csv: 'bucket',
        },
        variables: {
          locale: ['vocabulary.variables', 2],
          required: false,
          multiple: true,
          csv: [{ text: 'variable' }],
        },
        destination: {
          locale: [['objects.lookups.communications.communications', 1], 'objects.ccenter.members.destination'],
          required: true,
          multiple: true,
          csv: [{ text: 'destination' }],
        },
        commPriority: {
          locale: [['objects.lookups.communications.communications', 1], 'vocabulary.priority'],
          required: false,
          multiple: true,
          csv: [{ text: 'comm_priority' }],
        },
        code: {
          locale: [['objects.lookups.communications.communications', 1], 'objects.lookups.communications.code'],
          required: true,
          multiple: true,
          csv: [{ text: 'code' }],
        },
        description: {
          locale: [['objects.lookups.communications.communications', 1], 'objects.description'],
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
