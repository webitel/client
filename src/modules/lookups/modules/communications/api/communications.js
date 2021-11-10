import { CommunicationTypeServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const communicationService = new CommunicationTypeServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['code', 'name', 'description'];

const defaultSingleObject = {
  name: '',
  code: '',
  description: '',
};

const listGetter = new SdkListGetterApiConsumer(communicationService.searchCommunicationType);
const itemGetter = new SdkGetterApiConsumer(communicationService.readCommunicationType,
  { defaultSingleObject });
const itemCreator = new SdkCreatorApiConsumer(communicationService.createCommunicationType,
  { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(communicationService.updateCommunicationType,
  { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(communicationService.deleteCommunicationType);

const getCommunicationsList = (params) => listGetter.getList(params);
const getCommunication = (params) => itemGetter.getItem(params);
const addCommunication = (params) => itemCreator.createItem(params);
const updateCommunication = (params) => itemUpdater.updateItem(params);
const deleteCommunication = (params) => itemDeleter.deleteItem(params);
const getCommunicationsLookup = (params) => listGetter.getLookup(params);

const CommunicationsAPI = {
  getList: getCommunicationsList,
  get: getCommunication,
  add: addCommunication,
  update: updateCommunication,
  delete: deleteCommunication,
  getLookup: getCommunicationsLookup,
};

export default CommunicationsAPI;
