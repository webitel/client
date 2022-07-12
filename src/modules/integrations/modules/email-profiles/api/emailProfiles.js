import { EmailProfileServiceApiFactory } from 'webitel-sdk';
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

const emailProfilesService = new EmailProfileServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name',
  'description',
  'domainId',
  'enabled',
  'host',
  'imapPort',
  'login',
  'mailbox',
  'password',
  'schema',
  'smtpPort',
];

const defaultListObject = {
  enabled: false,
};

const defaultSingleObject = {
  imapPort: 0,
  smtpPort: 0,
};

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
  emailProfilesService.searchEmailProfile,
  {
    defaultListObject,
  },
);

const itemGetter = new SdkGetterApiConsumer(
  emailProfilesService.readEmailProfile,
  {
    defaultSingleObject,
    itemResponseHandler,
  },
);
const itemCreator = new SdkCreatorApiConsumer(
  emailProfilesService.createEmailProfile,
  {
    fieldsToSend,
    preRequestHandler,
  },
);
const itemPatcher = new SdkPatcherApiConsumer(
  emailProfilesService.patchEmailProfile,
  { fieldsToSend },
);
const itemUpdater = new SdkUpdaterApiConsumer(
  emailProfilesService.updateEmailProfile,
  {
    fieldsToSend,
    preRequestHandler,
  },
);
const itemDeleter = new SdkDeleterApiConsumer(emailProfilesService.deleteEmailProfile);

const getList = (params) => listGetter.getList(params);
const get = (params) => itemGetter.getItem(params);
const add = (params) => itemCreator.createItem(params);
const patch = (params) => itemPatcher.patchItem(params);
const update = (params) => itemUpdater.updateItem(params);
const deleteItem = (params) => itemDeleter.deleteItem(params);

const getLookup = (params) => listGetter.getLookup(params);

const EmailProfilesAPI = {
  getList,
  get,
  add,
  patch,
  update,
  delete: deleteItem,
  getLookup,
};

export default EmailProfilesAPI;
