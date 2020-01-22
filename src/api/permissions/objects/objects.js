import instance from '@/api/instance';
import eventBus from "../../../utils/eventBus";

const BASE_URL = '/objects';

export const getObjectList = async (search) => {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        class: '',
        obac: false,
        rbac: false,
        id: 0
    };

    let url = BASE_URL;
    if(search) url += `name='${search}*`;

    try {
        const response = await instance.get(url);
        return response.data.classes.map(item => {
            return {...defaultObject, ...item};
        });
    } catch (error) {
        throw error;
    }
};

export const updateObject = async (id, item) => {
    const url = BASE_URL + '/' + id;
    const updatedItem = {
        class: {
            obac: item.obac,
            rbac: item.rbac
        }
    };

    try {
        await instance.put(url, updatedItem);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};

export const getObject = async (id) => {
    const url = BASE_URL + '/' + id;
    try {
        const response = await instance.get(url);
        return response.data.class.class;
    } catch (error) {
        throw error;
    }
};

export const getObjectPermissions = async (id) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        const response = await instance.get(url);
        return coerceObjectPermissionsResponse(response);
    } catch (error) {
        throw error;
    }
};

export const patchObjectPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};

export const coerceObjectPermissionsResponse = (response) => {
    let formattedResponse = [];
    if (response.data.list) {
        // format response before assignment
        formattedResponse = response.data.list.map(item => {
            return {
                grantee: {
                    id: item.grantee.id,
                    name: item.grantee.name
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
};