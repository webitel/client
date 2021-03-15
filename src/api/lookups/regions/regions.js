import { RegionServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const regionService = new RegionServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'timezone', 'description'];

const listGetter = new SDKListGetter(regionService.searchRegion);
const itemGetter = new SDKGetter(regionService.readRegion);
const itemCreator = new SDKCreator(regionService.createRegion, fieldsToSend);
const itemUpdater = new SDKUpdater(regionService.updateRegion, fieldsToSend);
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
