import Vue from 'vue';
import instance from '@/api/instance';

const BASE_URL = '/objects';

export const getObjectList = async () => {
    // Vue.$log.info('get Permissions Objects', 'started');

    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        class: '',
        obac: false,
        rbac: false,
        id: 0
    };

    try {
        const response = await instance.get(BASE_URL);
        // Vue.$log.info('get Permissions Objects', 'response', response);

        return response.data.classes.map(item => {
            return Object.assign({}, defaultObject, item);
        });
    } catch (error) {
        throw error;
    }
}

export const getObject = async (id) => {
    // Vue.$log.info('get Permissions Object (1)', 'started');
    const url = BASE_URL + '/' + id;
    try {
        const response = await instance.get(url);
        // Vue.$log.info('get Permissions Object (1)', 'response', response);
        return response.data.class.class;
    } catch (error) {
        throw error;
    }
}

export const updateObject = async (id, permissions) => {
    // Vue.$log.info('update permissions Objects', 'started');
    const url = BASE_URL + '/' + id;
    const updatedObject = {
        class: {
            obac: permissions.obac,
            rbac: permissions.rbac
        }
    };

    try {
        const response = await instance.put(url, updatedObject);
        // Vue.$log.info('put Object', 'response', response);
    } catch (error) {
        throw error;
    }
}

export const getObjectPermissions = async (id) => {
    // Vue.$log.info('getObjectPermissions', 'started');
    const url = BASE_URL + '/' + id + '/acl';
    let formattedResponse = [];

    try {
        const response = await instance.get(url);
        // Vue.$log.info('getObjectPermissions', 'response', response);

        if (response.data.list) {
            // format response before assignment
            formattedResponse = response.data.list.map(item => {
                return {
                    grantee: {
                        id: item.grantee.id,
                        role: item.grantee.role
                    },
                    access: {
                        c: item.privileges.includes('CREATE'),
                        r: item.privileges.includes('SELECT'),
                        u: item.privileges.includes('UPDATE'),
                        d: item.privileges.includes('DELETE'),
                    }
                }
            });
        }

        return formattedResponse;
    } catch (error) {
        throw error;
    }
}

export const updateObjectPermissions = async (id, granteesToSend) => {
    // granteesToSend -- array
    // Vue.$log.info('updateObjectPermissions', 'started');
    const url = BASE_URL + '/' + id + '/acl';

    const changes = {
        changes: granteesToSend
    };

    try {
        const response = await instance.patch(url, changes);
        // Vue.$log.info('updateObjectPermissions response', response);
    } catch (error) {
        throw error;
    }
}