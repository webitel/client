import { RoutingOutboundCallServiceApiFactory } from 'webitel-sdk';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import store from '../../../store/store';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemPatcher } from '../../utils/ApiControllers/Patcher/SDKPatcher';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';


const dialplanService = new RoutingOutboundCallServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'schema', 'pattern', 'description', 'disabled'];

const defaultListItem = { _isSelected: false, disabled: false };

const listGetter = new WebitelSDKListGetter(dialplanService.searchRoutingOutboundCall, defaultListItem);
const itemGetter = new WebitelSDKItemGetter(dialplanService.readRoutingOutboundCall);
const itemCreator = new WebitelSDKItemCreator(dialplanService.createRoutingOutboundCall, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(dialplanService.updateRoutingOutboundCall, fieldsToSend);
const itemPatcher = new WebitelSDKItemPatcher(dialplanService.patchRoutingOutboundCall, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(dialplanService.deleteRoutingOutboundCall);

export const getDialplanList = async (page = 0, size = 10, search) => await listGetter.getList({ page, size, search });

export const getDialplan = async (id) => await itemGetter.getItem(id);

export const addDialplan = async (item) => await itemCreator.createItem(item);

export const patchDialplan = async (id, item) => await itemPatcher.patchItem(id, item);

export const updateDialplan = async (id, item) => await itemUpdater.updateItem(id, item);

export const deleteDialplan = async (id) => await itemDeleter.deleteItem(id);

export const moveDialplan = async (fromId, toId) => {
    const domain_id = store.state.userinfo.domainId;
    try {
        await dialplanService.movePositionRoutingOutboundCall(fromId, toId, { domain_id });
        eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
        throw err;
    }
};
