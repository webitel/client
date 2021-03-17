import { CommunicationTypeServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';


const communicationService = new CommunicationTypeServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['code', 'name', 'description'];

const defaultSingleObject = {
  name: '',
  code: '',
  description: '',
};

const listGetter = new SDKListGetter(communicationService.searchCommunicationType);
const itemGetter = new SDKGetter(communicationService.readCommunicationType,
  { defaultSingleObject });
const itemCreator = new SDKCreator(communicationService.createCommunicationType, { fieldsToSend });
const itemUpdater = new SDKUpdater(communicationService.updateCommunicationType, { fieldsToSend });
const itemDeleter = new SDKDeleter(communicationService.deleteCommunicationType);

export const getCommunicationsList = (params) => listGetter.getList(params);
export const getCommunication = (params) => itemGetter.getItem(params);
export const addCommunication = (params) => itemCreator.createItem(params);
export const updateCommunication = (params) => itemUpdater.updateItem(params);
export const deleteCommunication = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getCommunicationsList,
  get: getCommunication,
  add: addCommunication,
  update: updateCommunication,
  delete: deleteCommunication,
};
