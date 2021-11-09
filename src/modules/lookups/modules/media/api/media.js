import axios from 'axios';
import { MediaFileServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const mediaService = new MediaFileServiceApiFactory(configuration, '', instance);

const token = localStorage.getItem('access-token');
const baseUrl = process.env.VUE_APP_API_URL;

const listGetter = new SdkListGetterApiConsumer(mediaService.searchMediaFile);
const itemDeleter = new SdkDeleterApiConsumer(mediaService.deleteMediaFile);

export const getMediaList = (params) => listGetter.getList(params);

export const getMedia = async ({ itemId }) => {
  const url = `${baseUrl}/storage/media/${itemId}/stream?access_token=${token}`;
  try {
    return await instance.get(url);
  } catch (err) {
    throw err;
  }
};

export const downloadMedia = async (id) => {
  const url = `${baseUrl}/storage/media/${id}/download?access_token=${token}`;
  try {
    return await instance.get(url);
  } catch (err) {
    throw err;
  }
};

export const addMedia = async (params) => {
  const url = `${baseUrl}/storage/media?access_token=${token}`;
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

const getMediaLookup = (params) => listGetter.getLookup(params);

const MediaAPI = {
  getList: getMediaList,
  get: getMedia,
  add: addMedia,
  delete: deleteMedia,
  getLookup: getMediaLookup,
};

export default MediaAPI;
