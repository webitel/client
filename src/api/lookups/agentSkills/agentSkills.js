import { SkillServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const skillService = new SkillServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const listGetter = new SDKListGetter(skillService.searchSkill);
const itemGetter = new SDKGetter(skillService.readSkill);
const itemCreator = new SDKItemCreator(skillService.createSkill, fieldsToSend);
const itemUpdater = new SDKItemUpdater(skillService.updateSkill, fieldsToSend);
const itemDeleter = new SDKItemDeleter(skillService.deleteSkill);

export const getSkillsList = (params) => listGetter.getList(params);
export const getSkill = (params) => itemGetter.getItem(params);
export const addSkill = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateSkill = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteSkill = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getSkillsList,
  get: getSkill,
  add: addSkill,
  update: updateSkill,
  delete: deleteSkill,
};
