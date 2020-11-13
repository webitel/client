import instance from '../../instance';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import WebitelAPIPermissionsGetter from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsGetter';
import WebitelAPIPermissionsPatcher from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsPatcher';
import WebitelAPIDefaultAccess from '../../utils/ApiControllers/Permissions/WebitelAPIDefaultAccess';

const BASE_URL = '/objclass';

 const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
 const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);
 const defaultAccessList = new WebitelAPIDefaultAccess(BASE_URL);

export const getObjectList = async (search) => {
    const defaultObject = { // default object prototype, to merge response with it to get all fields
        class: '',
        obac: false,
        rbac: false,
        id: 0,
    };

    let url = BASE_URL;
    if (search) url += `name='${search}*`;

    try {
        const response = await instance.get(url);
        return response.items.map((item) => ({ ...defaultObject, ...item }));
    } catch (error) {
        throw error;
    }
};

export const updateObject = async (id, item) => {
    const url = `${BASE_URL}/${id}`;
    const updatedItem = {
        obac: item.obac,
        rbac: item.rbac,
    };

    try {
        await instance.put(url, updatedItem);
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (error) {
        throw error;
    }
};

export const getObject = async (id) => {
    const url = `${BASE_URL}/${id}`;
    try {
        const response = await instance.get(url);
        return response.class.class;
    } catch (error) {
        throw error;
    }
};

export const getObjectPermissions = async (id) => await permissionsGetter.getList(id);

export const patchObjectPermissions = async (id, item) => await permissionsPatcher.patchItem(id, item);

export const coerceObjectPermissionsResponse = (response) => {
    let formattedResponse = [];
    if (response.items) {
        // format response before assignment
        formattedResponse = response.items.map((item) => ({
                grantee: {
                    id: item.grantee.id,
                    name: item.grantee.name,
                },
                access: {
                    c: item.granted.includes('x'),
                    r: item.granted.includes('r'),
                    w: item.granted.includes('w'),
                    d: item.granted.includes('d'),
                },
            }));
    }
    return formattedResponse;
};

export const fetchObjclassDefaultList = async (oid) => {
    const getName = (value) => {
        switch (value) {
            case 1:
                return 'Forbidden';
            case 2:
                return 'Allow';
            case 3:
                return 'Allow with delegation';
            default:
                return '';
        }
    };
    const response = await defaultAccessList.searchObjclassDefaultList(oid);
    if (Array.isArray(response)) {
        const list = response.map((item) => ({
            grantee: item.grantee,
            grantor: item.grantor,
            perm: {
                r: {
                    id: ((item.granted.match(/r/g) || []).length + 1),
                    name: getName((item.granted.match(/r/g) || []).length + 1),
                    rule: 'r'.repeat((item.granted.match(/r/g) || []).length),
                },
                w: {
                    id: ((item.granted.match(/w/g) || []).length + 1),
                    name: getName((item.granted.match(/w/g) || []).length + 1),
                    rule: 'w'.repeat((item.granted.match(/w/g) || []).length),
                },
                d: {
                    id: ((item.granted.match(/d/g) || []).length + 1),
                    name: getName((item.granted.match(/d/g) || []).length + 1),
                    rule: 'd'.repeat((item.granted.match(/d/g) || []).length),
                },
            },
        }));
        return list;
    }
    return [];
};

export const toggleObjclassDefaultMode = async (oid, grantorId, rule) => await defaultAccessList.toggleObjclassDefaultMode(oid, grantorId, rule);