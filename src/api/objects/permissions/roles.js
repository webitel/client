import Vue from 'vue';
import instance from '../../instance';

const BASE_URL = '/roles';

export async function getRoleList() {
    // Vue.$log.info('get Roles', 'started');
    try {
        const response = await instance.get(BASE_URL);
        // Vue.$log.info('get Roles', 'response', response);
        return response.data.results;

    } catch (error) {
        throw error;
    }
}

export async function getRole(id) {
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

export async function addRole(roleToSend) {
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

export async function updateRole(id, roleToSend) {
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

export async function deleteRole(id) {
    // Vue.$log.info('delete role', 'started');
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.delete(url);
        // Vue.$log.info('delete Roles', 'response', response);
    } catch (error) {
        throw error;
    }
}

