import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {CommunicationTypeServiceApiFactory} from 'webitel-sdk';
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

const communicationService = new CommunicationTypeServiceApiFactory
(configuration, '', instance);

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

export const getCommunicationsList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getCommunication = async (id) => {
    return await itemGetter.getItem(id);
};

export const addCommunication = async (item) => {
    return await itemCreator.createItem(item);
};

export const updateCommunication = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const deleteCommunication = async (id) => {
    return await itemDeleter.deleteItem(id);
};