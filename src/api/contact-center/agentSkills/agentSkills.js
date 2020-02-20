import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {SkillServiceApiFactory} from 'webitel-sdk';
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

const skillService = new SkillServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'description'];

const listGetter = new WebitelSDKListGetter(skillService.searchSkill);
const itemGetter = new WebitelSDKItemGetter(skillService.readSkill);
const itemCreator = new WebitelSDKItemCreator(skillService.createSkill, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(skillService.updateSkill, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(skillService.deleteSkill);

export const getSkillsList = async (page, size, search) => {
    return await listGetter.getList({page, size, search});
};

export const getSkill = async (id) => {
    return await itemGetter.getItem(id);
};

export const addSkill = async (item) => {
    return await itemCreator.createItem(item);
};

export const updateSkill = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const deleteSkill = async (id) => {
    return await itemDeleter.deleteItem(id);
};