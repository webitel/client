import { SkillServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';


const skillService = new SkillServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'description'];

const listGetter = new WebitelSDKListGetter(skillService.searchSkill);
const itemGetter = new WebitelSDKItemGetter(skillService.readSkill);
const itemCreator = new WebitelSDKItemCreator(skillService.createSkill, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(skillService.updateSkill, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(skillService.deleteSkill);

export const getSkillsList = async (page, size, search) => await listGetter.getList({
  page,
  size,
  search,
});

export const getSkill = async (id) => await itemGetter.getItem(id);

export const addSkill = async (item) => await itemCreator.createItem(item);

export const updateSkill = async (id, item) => await itemUpdater.updateItem(id, item);

export const deleteSkill = async (id) => await itemDeleter.deleteItem(id);
