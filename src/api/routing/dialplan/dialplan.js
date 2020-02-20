import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {RoutingOutboundCallServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter, WebitelSDKItemPatcher,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

const dialplanService = new RoutingOutboundCallServiceApiFactory
(configuration, '', instance);

const defaultListObject = {
    disabled: false,
    _isSelected: false,
};

const fieldsToSend = ['domainId', 'name', 'schema', 'pattern', 'description'];

const listGetter = new WebitelSDKListGetter(dialplanService.searchRoutingOutboundCall);

const itemGetter = new WebitelSDKItemGetter(dialplanService.readRoutingOutboundCall);

const itemCreator = new WebitelSDKItemCreator(dialplanService.createRoutingOutboundCall, fieldsToSend);

const itemUpdater = new WebitelSDKItemUpdater(dialplanService.updateRoutingOutboundCall, fieldsToSend);

const itemPatcher = new WebitelSDKItemPatcher(dialplanService.patchRoutingOutboundCall, fieldsToSend);

const itemDeleter = new WebitelSDKItemDeleter(dialplanService.deleteRoutingOutboundCall);

export const getDialplanList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getDialplan = async (id) => {
    return await itemGetter.getItem(id);
};

export const addDialplan = async (item) => {
    return await itemCreator.createItem(item);
};

export const patchDialplan = async (id, item) => {
    return await itemPatcher.patchItem(id, item);
};

export const moveDialplan = async (fromId, toId) => {
    const domain_id = store.state.userinfo.domainId;
    try {
        await dialplanService.movePositionRoutingOutboundCall(fromId, toId, {domain_id});
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
};

export const updateDialplan = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const deleteDialplan = async (id) => {
    return await itemDeleter.deleteItem(id);
};