import { RegionServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const regionService = new RegionServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'timezone', 'description'];

const listGetter = new SdkListGetterApiConsumer(regionService.searchRegion);
const itemGetter = new SdkGetterApiConsumer(regionService.readRegion);
const itemCreator = new SdkCreatorApiConsumer(regionService.createRegion, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(regionService.updateRegion, { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(regionService.deleteRegion);

const getRegionsList = (params) => listGetter.getList(params);
const getRegion = (params) => itemGetter.getItem(params);
const addRegion = (params) => itemCreator.createItem(params);
const updateRegion = (params) => itemUpdater.updateItem(params);
const deleteRegion = (params) => itemDeleter.deleteItem(params);
const getRegionsLookup = (params) => listGetter.getLookup(params);

const RegionsAPI = {
  getList: getRegionsList,
  get: getRegion,
  add: addRegion,
  update: updateRegion,
  delete: deleteRegion,
  getLookup: getRegionsLookup,
};

export default RegionsAPI;
