import { BackendProfileServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  merge, mergeEach, notify, sanitize, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import AWSRegions from '../store/_internals/lookups/AWSRegions.lookup';
import DigitalOceanRegions from '../store/_internals/lookups/DigitalOceanRegions.lookup';
import StorageTypeAdapter from '../store/_internals/scripts/backendStorageTypeAdapters';

const storageService = new BackendProfileServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'maxSize', 'priority', 'properties', 'expireDays', 'type', 'disabled'];

const defaultListObject = {
  disabled: false,
  maxSize: 0,
  expireDays: 0,
  priority: 0,
};

const defaultSingleObject = {
  maxSize: 0,
  expireDays: 0,
  priority: 0,
};

const listResponseHandler = (response) => {
  const items = response.items.map((item) => (
    { ...item, type: StorageTypeAdapter.backendToEnum(item.type) }
    ));
  return { ...response, items };
};

const itemResponseHandler = (response) => {
  if (response.properties.region) {
    if (response.properties.endpoint.includes('aws')) {
      // eslint-disable-next-line no-param-reassign
      response.properties.region = AWSRegions
        .find((item) => item.value === response.properties.region);
    } else if (response.properties.endpoint.includes('digitalocean')) {
      // eslint-disable-next-line no-param-reassign
      response.properties.region = DigitalOceanRegions
        .find((item) => item.value === response.properties.region);
    }
  }
  return { ...response, type: StorageTypeAdapter.backendToEnum(response.type) };
};

const preRequestHandler = (item) => {
  if (item.properties.region && item.properties.region.value) {
    // eslint-disable-next-line no-param-reassign
    item.properties.region = item.properties.region.value;
  }
  // eslint-disable-next-line no-param-reassign
  item.type = StorageTypeAdapter.enumToBackend(item.type);
  return item;
};

// const listGetter = new SdkListGetterApiConsumer(storageService.searchBackendProfile,
//   { defaultListObject, listResponseHandler });
const getStorageList = async (params) => {
  const listResponseHandler = (items) => {
    return items.map((item) => ({
      ...item,
      statusDuration: convertStatusDuration(item.statusDuration),
    }));
  };

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    team,
    skill,
    isSupervisor,
    isNotSupervisor,
    notTeamId,
    supervisorId,
    notSkillId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await agentService.searchAgent(
      page,
      size,
      search,
      sort,
      fields,
      id,
      undefined,
      supervisorId,
      team,
      undefined,
      undefined,
      isSupervisor,
      skill,
      undefined,
      isNotSupervisor,
      undefined,
      undefined,
      notTeamId,
      notSkillId,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        listResponseHandler,
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemGetter = new SdkGetterApiConsumer(storageService.readBackendProfile,
//   { defaultSingleObject, itemResponseHandler });
const getStorage = async ({ itemId: id }) => {
  const defaultObject = {
    user: {},
    team: {},
    supervisor: [],
    auditor: [],
    region: {},
    progressiveCount: 0,
    chatCount: 0,
    isSupervisor: false,
    description: '',
    greetingMedia: {},
  };

  try {
    const response = await agentService.readAgent(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemCreator = new SdkCreatorApiConsumer(storageService.createBackendProfile,
//   { fieldsToSend, preRequestHandler });
const addStorage = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentService.createAgent(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemPatcher = new SdkPatcherApiConsumer(storageService.patchBackendProfile, { fieldsToSend });
const patchStorage = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentService.patchAgent(id, body);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemUpdater = new SdkUpdaterApiConsumer(storageService.updateBackendProfile,
//   { fieldsToSend, preRequestHandler });
const updateStorage = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentService.updateAgent(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemDeleter = new SdkDeleterApiConsumer(storageService.deleteBackendProfile);
const deleteStorage = async ({ id }) => {
  try {
    const response = await agentService.deleteAgent(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getLookup = (params) => getStorageList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const StorageAPI = {
  getList: getStorageList,
  get: getStorage,
  add: addStorage,
  patch: patchStorage,
  update: updateStorage,
  delete: deleteStorage,
  getLookup,
};

export default StorageAPI;
