import { RegionServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const regionService = new RegionServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'timezone', 'description'];

const listGetter = new SDKListGetter(regionService.searchRegion);
const itemGetter = new SDKGetter(regionService.readRegion);
const itemCreator = new SDKItemCreator(regionService.createRegion, fieldsToSend);
const itemUpdater = new SDKItemUpdater(regionService.updateRegion, fieldsToSend);
const itemDeleter = new SDKItemDeleter(regionService.deleteRegion);

export const getRegionsList = (params) => listGetter.getList(params);
export const getRegion = (params) => itemGetter.getItem(params);
export const addRegion = (params) => itemCreator.createItem(params);
export const updateRegion = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteRegion = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getRegionsList,
  get: getRegion,
  add: addRegion,
  update: updateRegion,
  delete: deleteRegion,
};
