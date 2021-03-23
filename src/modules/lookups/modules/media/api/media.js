import axios from 'axios';
import { MediaFileServiceApiFactory } from 'webitel-sdk';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const mediaService = new MediaFileServiceApiFactory(configuration, '', instance);

const token = localStorage.getItem('access-token');
const BASE_URL = process.env.VUE_APP_API_URL;

const listGetter = new SDKListGetter(mediaService.searchMediaFile);
const itemDeleter = new SDKDeleter(mediaService.deleteMediaFile);

export const getMediaList = (params) => listGetter.getList(params);

export const getMedia = async ({ itemId }) => {
  const url = `${BASE_URL}/storage/media/${itemId}/stream?access_token=${token}`;
  try {
    return await instance.get(url);
  } catch (err) {
    throw err;
  }
};

export const downloadMedia = async (id) => {
  const url = `${BASE_URL}/storage/media/${id}/download?access_token=${token}`;
  try {
    return await instance.get(url);
  } catch (err) {
    throw err;
  }
};

export const addMedia = async (params) => {
  const url = `${BASE_URL}/storage/media?access_token=${token}`;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('file', params.itemInstance);
  try {
    const response = await axios.post(url, formData, config);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteMedia = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getMediaList,
  get: getMedia,
  add: addMedia,
  delete: deleteMedia,
};
