import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {BackendProfileServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../utils/eventBus";
import sanitizer from "../utils/sanitizer";
import {objCamelToSnake, objSnakeToCamel} from "../utils/caseConverters";

const storageService = new BackendProfileServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const fieldsToSend = ['name', 'maxSize', 'priority', 'properties', 'expireDays', 'type',];

export const getStorageList = async (page = 0, size = 10, search) => {
    const defaultObject = {
        _isSelected: false,
        enabled: false,
    };

    try {
        const response = await storageService.searchBackendProfile(page, size);
        if (!response.data.items) response.data.items = [];
        return response.data.items.map(item => {return {...defaultObject, ...objSnakeToCamel(item)}});
    } catch (err) {
        throw err;
    }
};

export const getStorage = async (id) => {
    const defaultObject = {
        _dirty: false,
    };
    try {
        let response = await storageService.readBackendProfile(id);
        return {...defaultObject, ...objSnakeToCamel(response.data)};
    } catch (err) {
        throw err;
    }
};

export const addStorage = async (item) => {
    let itemCopy = {...item};
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);

    try {
        const response = await storageService.createBackendProfile(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const patchStorage = async (id, changes) => {
    try {
        await storageService.patchBackendProfile(id, changes);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const updateStorage = async (id, item) => {
    let itemCopy = {...item};
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);

    try {
        await storageService.updateBackendProfile(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteStorage = async (id) => {
    try {
        await storageService.deleteBackendProfile(id);
    } catch (err) {
        throw err;
    }
};