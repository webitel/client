import { CommunicationTypeServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';


const communicationService = new CommunicationTypeServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'code', 'name', 'description'];

const defaultItemObject = {
  name: '',
  code: '',
  description: '',
  _dirty: false,
};

const listGetter = new WebitelSDKListGetter(communicationService.searchCommunicationType);
const itemGetter = new WebitelSDKItemGetter(communicationService.readCommunicationType, defaultItemObject);
const itemCreator = new WebitelSDKItemCreator(communicationService.createCommunicationType, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(communicationService.updateCommunicationType, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(communicationService.deleteCommunicationType);

export const getCommunicationsList = async (page = 0, size = 10, search) => await listGetter.getList({
  page,
  size,
  search,
});

export const getCommunication = async (id) => await itemGetter.getItem(id);

export const addCommunication = async (item) => await itemCreator.createItem(item);

export const updateCommunication = async (id, item) => await itemUpdater.updateItem(id, item);

export const deleteCommunication = async (id) => await itemDeleter.deleteItem(id);
