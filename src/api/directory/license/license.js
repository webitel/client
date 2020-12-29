import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';

const BASE_URL = '/license';

export async function getLicenseList(page = 1, size = 10, search) {
    const defaultObject = { // default object prototype, to merge response with it to get all fields
        remain: 0,
        limit: 0,
    };
    let url = `${BASE_URL}?page=${page}&size=${size}`;
    if (search) url += `&name=${search}*`;

    try {
        const response = await instance.get(url);
        if (response.items) {
            return {
                list: response.items.map((item) => ({ ...defaultObject, ...item })),
                next: response.next || false,
            };
        }
        return [];
    } catch (error) {
        throw error;
    }
}

export const updateLicense = async (certificate) => {
    const url = '/customer';
    try {
        await instance.put(url, { certificate });
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
};
