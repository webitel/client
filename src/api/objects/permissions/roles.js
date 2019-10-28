import Vue from 'vue';
import instance from '../../instance';

const BASE_URL = '/roles';

export const getRoleList = async () => {
    try {
        const response = await instance.get(BASE_URL);
        response.data.results.forEach(res => res.isSelected = false);
        return response.data.results;

    } catch (error) {
        throw error;
    }
}

export const getRole = async (id) => {
    // Vue.$log.info('get Role (1)', 'started');
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.get(url);
        // Vue.$log.info('get Role (1)', 'response', response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addRole = async (roleToSend) => {
    // Vue.$log.info('add role', 'started');
    const newRole = {
        role: roleToSend
    };

    try {
        const response = await instance.post(BASE_URL, newRole);
        // Vue.$log.info('post Roles', 'response', response);
    } catch (error) {
        throw error;
    }
}

export const updateRole = async (id, roleToSend) => {
    // Vue.$log.info('update role', 'started');
    const updatedRole = {
        role: roleToSend
    };
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.put(url, updatedRole);
        // Vue.$log.info('put Roles', 'response', response);
    } catch (error) {
        throw error;
    }
}

export const deleteRole = async (id) => {
    // Vue.$log.info('delete role', 'started');
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.delete(url);
        // Vue.$log.info('delete Roles', 'response', response);
    } catch (error) {
        throw error;
    }
}

