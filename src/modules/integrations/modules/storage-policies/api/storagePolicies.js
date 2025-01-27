import { getDefaultGetListResponse, getDefaultGetParams } from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
  camelToSnake,
  merge,
  mergeEach,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import deepCopy from 'deep-copy';
import { FilePoliciesServiceApi } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const storagePolicies = new FilePoliciesServiceApi(configuration, '', instance);

const fieldsToSend = [
  'name',
  'description',
  'channels',
  'mimeTypes',
  'retentionDays',
  'speedDownload',
  'speedUpload',
  'maxUploadSize',
  'enabled',
];

const fields = [
  'id',
  'name',
  'description',
  'channels',
  'mime_types',
  'retention_days',
  'speed_download',
  'speed_upload',
  'max_upload_size',
  'position',
  'enabled',
];

const preRequestHandler = (item) => {
  const copy = deepCopy(item);
  return {
      ...copy,
      channels: item.channels.map(channel => channel.value || channel),
    };
}

const getStoragePoliciesList = async (params) => {

  const defaultObject = {
    name: '',
    description: '',
    channels: [],
    mimeTypes: [],
    retentionDays: 0,
    speedDownload: 0,
    speedUpload: 0,
    maxUploadSize: 0,
    position: 0,
    enabled: false,
  };

  const { page, size, search, sort, id } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await storagePolicies.searchFilePolicies(
      page,
      size,
      search,
      sort,
      fields,
      id,
    );

    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject)
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getStoragePolicy = async ({ itemId: id }) => {
  const defaultObject = {
    name: '',
    description: '',
    channels: [],
    mimeTypes: [],
    retentionDays: 0,
    speedDownload: 0,
    speedUpload: 0,
    maxUploadSize: 0,
    position: 0,
    enabled: false,
  };


  try {
    const response = await storagePolicies.readFilePolicy(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
    ]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addStoragePolicy = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake('channels'),
    preRequestHandler,
  ]);
  try {
    const response = await storagePolicies.createFilePolicy(item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateStoragePolicy = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake('channels'),
    preRequestHandler,
  ]);
  try {
    const response = await storagePolicies.updateFilePolicy(id, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const patchStoragePolicy = async ({ changes, id }) => {
  const body = applyTransform(changes, [sanitize(fieldsToSend), camelToSnake()]);
  try {
    const response = await storagePolicies.patchFilePolicy(id, body);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteStoragePolicy = async ({ id }) => {
  try {
    const response = await storagePolicies.deleteFilePolicy(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getLookup = (params) =>
  getStoragePoliciesList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const applyPolicies = async (id) => {
  try {
    const response = await storagePolicies.filePolicyApply(id, {});
    return response.data;
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
}

const StoragePoliciesAPI = {
  getList: getStoragePoliciesList,
  get: getStoragePolicy,
  add: addStoragePolicy,
  patch: patchStoragePolicy,
  update: updateStoragePolicy,
  delete: deleteStoragePolicy,
  applyPolicies,
  getLookup,
};

export default StoragePoliciesAPI;
