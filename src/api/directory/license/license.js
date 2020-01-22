import instance from '@/api/instance';
import {objSnakeToCamel} from "../../utils/caseConverters";
import eventBus from "../../../utils/eventBus";

const BASE_URL = '/license';

export async function getLicenseList(page = 0, size = 100, search) {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        remain: 0,
        limit: 0,
    };

    // let url = BASE_URL + `?page=${page}size=${size}`;
    let url = BASE_URL + `?size=${size}`;
    if (search) url += `&name=${search}*`;

    try {
        let response = await instance.get(url);
        if (!response.data.license) response.data.license = [];

        return response.data.license.map(item => {
            return {...defaultObject, ...objSnakeToCamel(item)};
        });
    } catch (error) {
        throw error;
    }
}

export const updateLicense = async (certificate) => {
    const url = '/customer';
    try {
        await instance.put(url, {certificate});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};