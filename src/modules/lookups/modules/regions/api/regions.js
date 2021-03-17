import { RegionServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const regionService = new RegionServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'timezone', 'description'];

const listGetter = new SDKListGetter(regionService.searchRegion);
const itemGetter = new SDKGetter(regionService.readRegion);
const itemCreator = new SDKCreator(regionService.createRegion, { fieldsToSend });
const itemUpdater = new SDKUpdater(regionService.updateRegion, { fieldsToSend });
const itemDeleter = new SDKDeleter(regionService.deleteRegion);

export const getRegionsList = (params) => listGetter.getList(params);
export const getRegion = (params) => itemGetter.getItem(params);
export const addRegion = (params) => itemCreator.createItem(params);
export const updateRegion = (params) => itemUpdater.updateItem(params);
export const deleteRegion = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getRegionsList,
  get: getRegion,
  add: addRegion,
  update: updateRegion,
  delete: deleteRegion,
};
