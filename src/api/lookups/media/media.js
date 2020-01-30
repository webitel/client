import instance from '@/api/instance';
import axios from 'axios';
import configuration from '@/api/openAPIConfig';
import {MediaFileServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objSnakeToCamel} from "../../utils/caseConverters";

const mediaService = new MediaFileServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const fieldsToSend = [];

export const getMediaList = async (page = 0, size = 10, search) => {
    try {
        let response = await mediaService.searchMediaFile(page, size);
        if (!response.data.items) response.data.items = [];
        response = response.data.items.map(item => {
            return {...objSnakeToCamel(item), _isSelected: false}
        });
        return response;
    } catch (err) {
        throw err;
    }
};

export const getMedia = async (id) => {
    const token = 'IGORDEV_TOKEN';
    const url = `https://dev.webitel.com/api/storage/media/${id}/stream?access_token=${token}`;
    try {
        const response = await instance.get(url);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const downloadMedia = async (id) => {
    const token = 'IGORDEV_TOKEN';
    const url = `https://dev.webitel.com/api/storage/media/${id}/download?access_token=${token}`;
    try {
        const response = await instance.get(url);
        return response.data;
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
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const deleteMedia = async (id) => {
    try {
        await mediaService.deleteMediaFile(id);
    } catch (err) {
        throw err;
    }
};