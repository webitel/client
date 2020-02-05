import instance from '../../instance';
import axios from 'axios';
import configuration from '../../openAPIConfig';
import {MediaFileServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objSnakeToCamel} from "../../utils/caseConverters";
import store from "../../../store/store";

const mediaService = new MediaFileServiceApiFactory
(configuration, '', instance);

export const getMediaList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    if(search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        name: '',
        _isSelected: false,
    };

    try {
        let response = await mediaService.searchMediaFile(page, size, search, domainId);
        if (response.items) {
            return response.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getMedia = async (id) => {
    const token = 'IGORDEV_TOKEN';
    const url = `https://dev.webitel.com/api/storage/media/${id}/stream?access_token=${token}`;
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        return await instance.get(url, domainId);
    } catch (err) {
        throw err;
    }
};

export const downloadMedia = async (id) => {
    const token = 'IGORDEV_TOKEN';
    const url = `https://dev.webitel.com/api/storage/media/${id}/download?access_token=${token}`;
    try {
        return await instance.get(url);
    } catch (err) {
        throw err;
    }
};

export const addMedia = async (file) => {
    const token = 'IGORDEV_TOKEN';
    const url = `https://dev.webitel.com/api/storage/media?access_token=${token}`;
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post(url, formData, config);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const deleteMedia = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await mediaService.deleteMediaFile(id, domainId);
    } catch (err) {
        throw err;
    }
};