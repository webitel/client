import instance from '../../instance';
import eventBus from "../../../utils/eventBus";
import {WebitelAPIPermissionsGetter, WebitelAPIPermissionsPatcher} from "../../utils/apiControllers";

const BASE_URL = '/objects';

const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

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
        return response.classes.map(item => {
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
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (error) {
        throw error;
    }
};

export const getObject = async (id) => {
    const url = BASE_URL + '/' + id;
    try {
        const response = await instance.get(url);
        return response.class.class;
    } catch (error) {
        throw error;
    }
};

export const getObjectPermissions = async (id) => {
    return await permissionsGetter.getList(id);
};

export const patchObjectPermissions = async (id, item) => {
    return await permissionsPatcher.patchItem(id, item);
};

export const coerceObjectPermissionsResponse = (response) => {
    let formattedResponse = [];
    if (response.list) {
        // format response before assignment
        formattedResponse = response.list.map(item => {
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