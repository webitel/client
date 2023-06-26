import axios from 'axios';
import { MediaFileServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../../../../app/api/old/instance';
import errorEventBusNotificationResponseInterceptor
  from '../../../../../app/api/old/interceptors/response/errorEventBusNotificationResponse.interceptor';
import configuration from '../../../../../app/api/openAPIConfig';

const mediaService = new MediaFileServiceApiFactory(configuration, '', instance);

const token = localStorage.getItem('access-token');
const baseUrl = process.env.VUE_APP_API_URL;

const listGetter = new SdkListGetterApiConsumer(mediaService.searchMediaFile);
const itemDeleter = new SdkDeleterApiConsumer(mediaService.deleteMediaFile);

const getMediaList = (params) => listGetter.getList(params);

const getMedia = async ({ itemId }) => {
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

const addMediaInstance = axios.create({
  headers: {
    'content-type': 'multipart/form-data',
  },
});

addMediaInstance.interceptors.response.use(...errorEventBusNotificationResponseInterceptor.default);

const addMedia = async (params) => {
  const url = `${baseUrl}/storage/media?access_token=${token}`;

  const formData = new FormData();
  formData.append('file', params.itemInstance);
  try {
    const response = await addMediaInstance.post(url, formData);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
    return response;
  } catch (err) {
    throw err;
  }
};

const deleteMedia = (params) => itemDeleter.deleteItem(params);

const getMediaLookup = (params) => listGetter.getLookup(params);

const MediaAPI = {
  getList: getMediaList,
  get: getMedia,
  add: addMedia,
  delete: deleteMedia,
  getLookup: getMediaLookup,
};

export default MediaAPI;
