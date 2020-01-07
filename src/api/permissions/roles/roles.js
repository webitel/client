import instance from '../../instance';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";

const BASE_URL = '/roles';
const fieldsToSend = ['name'];

export const getRoleList = async (page = 0, size = 10, search) => {
    // let url = `${BASE_URL}?page=${page}size=${size}`;
    let url = `${BASE_URL}?size=${size}`;
    if(search) url += `name='${search}*`;
    try {
        const response = await instance.get(url);
        response.data.results.forEach(res => res._isSelected = false);
        return response.data.results;

    } catch (error) {
        throw error;
    }
};

export const getRole = async (id) => {
    const url = BASE_URL + '/' + id;
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        name: 'name undefined',
        id: 0,
        _dirty: false,
    };
    try {
        const response = await instance.get(url);
        return {...defaultObject, ...response.data.role};
    } catch (error) {
        throw error;
    }
};

export const addRole = async (item) => {
    sanitizer(item, fieldsToSend);
    try {
        const response = await instance.post(BASE_URL, {role: item});
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.role.id;
    } catch (error) {
        throw error;
    }
};

export const updateRole = async (id, item) => {
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.put(url, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
        return response.data.role.id;
    } catch (error) {
        throw error;
    }
};

export const deleteRole = async (id) => {
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.delete(url);
    } catch (error) {
        throw error;
    }
};

