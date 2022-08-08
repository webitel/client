import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import ImportCsvAPI from '../api/importCsv';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    description: '',
    name: '',
    source_id: '',
    source_type: '',
    parameters: {
      charSet: '',
      separator: '',
      skipHeaders: true,
      clearMember: true,
      queues: {},
      mappingFields: [
        {
          name: 'name',
          required: true,
          csv: '',
        },
        {
          name: 'timezoneId',
          required: false,
          csv: '',
        },
        {
          name: 'priority',
          required: false,
          csv: 0,
        },
        {
          text: 'Expire',
          name: 'expireAt',
          required: false,
          csv: '',
        },
        {
          name: 'bucketId',
          required: false,
          csv: '',
        },
        {
          name: 'variables',
          required: false,
          multiple: true,
          csv: [],
        },
        {
          text: 'Communication destination',
          name: 'destination',
          required: true,
          multiple: true,
          csv: [],
        },
        {
          text: 'Communication priority',
          name: 'commPriority',
          required: false,
          multiple: true,
          csv: [],
        },
        {
          text: 'Communication code',
          name: 'code',
          required: true,
          multiple: true,
          csv: [],
        },
        {
          text: 'Communication description',
          name: 'description',
          required: false,
          multiple: true,
          csv: [],
        },
      ],
    },
  },
};

 const PERMISSIONS_API_URL = '/storage/import_csv';
 const permissions = new PermissionsStoreModule()
 .generateAPIActions(PERMISSIONS_API_URL)
 .getModule();

const importCSV = new ObjectStoreModule({ resettableState, headers })
.attachAPIModule(ImportCsvAPI)
.generateAPIActions()
.setChildModules({ permissions })
.getModule({});

export default importCSV;
