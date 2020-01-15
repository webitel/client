import instance from '@/api/instance';
import {objSnakeToCamel} from "../../utils/caseConverters";

const BASE_URL = '/license';

export async function getLicenseList(page = 0, size = 100, search) {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields

    };

    // let url = BASE_URL + `?page=${page}size=${size}`;
    let url = BASE_URL + `?size=${size}`;
    if (search) url += `&name=${search}*`;

    try {
        let response = {data: {license: []}};
        for (let i = 0; i < 8; i++) {
            response.data.license.push({
                serial: '' + i + i + i,
                product: 'Kibana',
                validFrom: new Date(2018, 10, Math.random() * 30),
                validTill: new Date(2019, 8, Math.random() * 30),
                used: '444',
                limit: '444',
                status: 'status',
                id: i,
            });
        }
        // let response = await instance.get(url);
        if (!response.data.license) response.data.license = [];

        return response.data.license.map(item => {
            return {...defaultObject, ...item};
        });
    } catch (error) {
        throw error;
    }
}

export async function getLicense(id) {
    const url = BASE_URL + '/' + id;

    const defaultObject = {  // default object prototype, to merge response with it to get all fields

    };

    try {
        let response = await instance.get(url);
        return {...defaultObject, ...response.data.license};
    } catch (error) {
        throw error;
    }
}