import { SkillServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const skillService = new SkillServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const listGetter = new SdkListGetterApiConsumer(skillService.searchSkill);
const itemGetter = new SdkGetterApiConsumer(skillService.readSkill);
const itemCreator = new SdkCreatorApiConsumer(skillService.createSkill, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(skillService.updateSkill, { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(skillService.deleteSkill);

const getSkillsList = (params) => listGetter.getList(params);
const getSkill = (params) => itemGetter.getItem(params);
const addSkill = (params) => itemCreator.createItem(params);
const updateSkill = (params) => itemUpdater.updateItem(params);
const deleteSkill = (params) => itemDeleter.deleteItem(params);
const getSkillsLookup = (params) => listGetter.getLookup(params);

const SkillsAPI = {
  getList: getSkillsList,
  get: getSkill,
  add: addSkill,
  update: updateSkill,
  delete: deleteSkill,
  getLookup: getSkillsLookup,
};

export default SkillsAPI;
