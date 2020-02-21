import instance from '../../instance';
import axios from 'axios';
import configuration from '../../openAPIConfig';
import {MediaFileServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import store from "../../../store/store";
import {WebitelSDKItemDeleter, WebitelSDKListGetter} from "../../utils/apiControllers";

const mediaService = new MediaFileServiceApiFactory
(configuration, '', instance);

const token = localStorage.getItem('access-token');
const BASE_URL = process.env.VUE_APP_API_URL;

const listGetter = new WebitelSDKListGetter(mediaService.searchMediaFile);
const itemDeleter = new WebitelSDKItemDeleter(mediaService.deleteMediaFile);

export const getMediaList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getMedia = async (id) => {
    const url = `${BASE_URL}/storage/media/${id}/stream?access_token=${token}`;
    const domainId = store.state.userinfo.domainId;
    try {
        return await instance.get(url, domainId);
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

export const addMedia = async (file) => {
    const url = `${BASE_URL}/storage/media?access_token=${token}`;
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post(url, formData, config);
        eventBus.$emit('notificationInfo', 'Successfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const deleteMedia = async (id) => {
    return await itemDeleter.deleteItem(id);
};