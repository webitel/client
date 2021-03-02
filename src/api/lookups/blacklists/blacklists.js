/* eslint-disable no-return-await */
import { ListServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const listService = new ListServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'description'];

const listGetter = new WebitelSDKListGetter(listService.searchList);
const itemGetter = new WebitelSDKItemGetter(listService.readList);
const itemCreator = new WebitelSDKItemCreator(listService.createList, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(listService.updateList, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(listService.deleteList);

export const getBlacklistList = async (page, size, search) => await listGetter.getList({
  page,
  size,
  search,
});

export const getBlacklist = async (id) => await itemGetter.getItem(id);

export const addBlacklist = async (item) => await itemCreator.createItem(item);

export const updateBlacklist = async (id, item) => await itemUpdater.updateItem(id, item);

export const deleteBlacklist = async (id) => await itemDeleter.deleteItem(id);
