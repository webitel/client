import deepCopy from 'deep-copy';
import { ImportTemplateServiceApiFactory } from 'webitel-sdk';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkGetterApiConsumer,
  SdkListGetterApiConsumer,
  SdkPatcherApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/old/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const importCsvService = new ImportTemplateServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'description',
  'name',
  'parameters',
  'source',
  'sourceType',
];

/*
* We need to preserve fields order because we draw them dynamically so that
* we convert it to array before sending to backend and back
* */
// const itemResponseHandler = (response) => {
//   // eslint-disable-next-line no-param-reassign
//   response.parameters.mappings = response.parameters.mappings
//   .reduce((mappings, { name, ...rest }) => ({ ...mappings, [name]: { ...rest } }), {});
//   return {
//     ...response,
//   };
// };

/*
* We need to preserve fields order because we draw them dynamically so that
* we convert it to array before sending to backend and back
* */
// const preRequestHandler = (item) => {
//   const mappings = Object.entries(item.parameters.mappings)
//   .map(([name, value]) => ({ name, ...value }));
//   const _item = deepCopy(item);
//   _item.parameters.mappings = mappings;
//   return _item;
// };

const listGetter = new SdkListGetterApiConsumer(
  importCsvService.searchImportTemplate,
);

const itemGetter = new SdkGetterApiConsumer(
  importCsvService.readImportTemplate,
  {
    // itemResponseHandler,
  },
);
const itemCreator = new SdkCreatorApiConsumer(
  importCsvService.createImportTemplate,
  {
    fieldsToSend,
    // preRequestHandler,
  },
);
const itemPatcher = new SdkPatcherApiConsumer(
  importCsvService.patchImportTemplate,
  { fieldsToSend },
);
const itemUpdater = new SdkUpdaterApiConsumer(
  importCsvService.updateImportTemplate,
  {
    fieldsToSend,
    // preRequestHandler,
  },
);
const itemDeleter = new SdkDeleterApiConsumer(importCsvService.deleteImportTemplate);

const getList = (params) => listGetter.getList(params);
const get = (params) => itemGetter.getItem(params);
const add = (params) => itemCreator.createItem(params);
const patch = (params) => itemPatcher.patchItem(params);
const update = (params) => itemUpdater.updateItem(params);
const deleteItem = (params) => itemDeleter.deleteItem(params);

const getLookup = (params) => listGetter.getLookup(params);

const ImportCsvAPI = {
  getList,
  get,
  add,
  patch,
  update,
  delete: deleteItem,
  getLookup,
};

export default ImportCsvAPI;
