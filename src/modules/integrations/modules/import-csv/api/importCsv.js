import { ImportTemplateServiceApiFactory } from 'webitel-sdk';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkGetterApiConsumer,
  SdkListGetterApiConsumer,
  SdkPatcherApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const importCsvService = new ImportTemplateServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'description',
  'name',
  'parameters',
  'source',
  'sourceType',
];

const itemResponseHandler = (response) => {
  return {
    ...response,
  };
};

const preRequestHandler = (item) => {
  return {
    ...item,
  };
};

const listGetter = new SdkListGetterApiConsumer(
  importCsvService.searchImportTemplate,
);

const itemGetter = new SdkGetterApiConsumer(
  importCsvService.readImportTemplate,
  {
    itemResponseHandler,
  },
);
const itemCreator = new SdkCreatorApiConsumer(
  importCsvService.createImportTemplate,
  {
    fieldsToSend,
    preRequestHandler,
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
    preRequestHandler,
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
