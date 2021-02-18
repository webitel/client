import { ListServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import store from '../../../store/store';

const listService = new ListServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'listId', 'description', 'number'];

export const getBlacklistCommunicationList = async (listId, page = 0, size = 10, search) => {
  const { domainId } = store.state.userinfo;
  if (search && search.slice(-1) !== '*') search += '*';
  const defaultObject = {
    name: '',
    _isSelected: false,
  };
  try {
    const response = await listService.searchListCommunication(listId, page, size, search, domainId);
    if (response.items) {
      return {
        list: response.items.map((item) => ({ ...defaultObject, ...item })),
        isNext: response.next || false,
      };
    }
    return [];
  } catch (err) {
    throw err;
  }
};

export const getBlacklistCommunication = async (listId, id) => {
  const { domainId } = store.state.userinfo;
  const defaultObject = {
    _dirty: false,
  };
  try {
    const response = await listService.readListCommunication(listId, id, domainId);
    return { ...defaultObject, ...response };
  } catch (err) {
    throw err;
  }
};

export const addBlacklistCommunication = async (listId, item) => {
  const itemCopy = deepCopy(item);
  itemCopy.domainId = store.state.userinfo.domainId;
  itemCopy.listId = listId;
  sanitizer(item, fieldsToSend);
  try {
    const response = await listService.createListCommunication(listId, itemCopy);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
    return response.id;
  } catch (err) {
    throw err;
  }
};

export const updateBlacklistCommunication = async (listId, id, item) => {
  const itemCopy = deepCopy(item);
  itemCopy.domainId = store.state.userinfo.domainId;
  itemCopy.listId = listId;
  sanitizer(itemCopy, fieldsToSend);
  try {
    await listService.updateListCommunication(listId, id, itemCopy);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
  } catch (err) {
    throw err;
  }
};

export const deleteBlacklistCommunication = async (listId, id) => {
  const { domainId } = store.state.userinfo;
  try {
    await listService.deleteListCommunication(listId, id, domainId);
  } catch (err) {
    throw err;
  }
};
