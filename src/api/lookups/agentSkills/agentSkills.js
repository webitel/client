import { SkillServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const skillService = new SkillServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const listGetter = new SDKListGetter(skillService.searchSkill);
const itemGetter = new SDKGetter(skillService.readSkill);
const itemCreator = new SDKCreator(skillService.createSkill, fieldsToSend);
const itemUpdater = new SDKUpdater(skillService.updateSkill, fieldsToSend);
const itemDeleter = new SDKDeleter(skillService.deleteSkill);

export const getSkillsList = (params) => listGetter.getList(params);
export const getSkill = (params) => itemGetter.getItem(params);
export const addSkill = (params) => itemCreator.createItem(params);
export const updateSkill = (params) => itemUpdater.updateItem(params);
export const deleteSkill = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getSkillsList,
  get: getSkill,
  add: addSkill,
  update: updateSkill,
  delete: deleteSkill,
};
