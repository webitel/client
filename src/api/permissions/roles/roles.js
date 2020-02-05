import instance from '../../instance';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";

const BASE_URL = '/roles';
const fieldsToSend = ['name', 'description'];

export const getRoleList = async (page = 0, size = 10, search) => {
    // let url = `${BASE_URL}?page=${page}size=${size}`;
    let url = `${BASE_URL}?size=${size}`;
    if(search) url += `name='${search}*`;
    const defaultObject = {
        name: '',
        _isSelected: false,
    };

    try {
        let response = await instance.get(url);
        if (response.results) {
            return response.results.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
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
        return {...defaultObject, ...response.role};
    } catch (error) {
        throw error;
    }
};

export const addRole = async (item) => {
    sanitizer(item, fieldsToSend);
    try {
        const response = await instance.post(BASE_URL, {role: item});
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.created.id;
    } catch (error) {
        throw error;
    }
};

export const updateRole = async (id, item) => {
    const url = BASE_URL + '/' + id;
    sanitizer(item, fieldsToSend);
    try {
        await instance.put(url, {role: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};

export const deleteRole = async (id) => {
    const url = BASE_URL + '/' + id;

    try {
        await instance.delete(url);
    } catch (error) {
        throw error;
    }
};

