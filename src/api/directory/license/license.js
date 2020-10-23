import instance from '../../instance';
import eventBus from '../../../utils/eventBus';

const BASE_URL = '/license';

export async function getLicenseList(page = 0, size = 2, search) {
    const defaultObject = { // default object prototype, to merge response with it to get all fields
        remain: 0,
        limit: 0,
    };
    let url = `${BASE_URL}?size=${size}`;
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
