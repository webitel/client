import Vue from 'vue';
import instance from '@/api/instance';

const BASE_URL = '/sip/gateways';

export async function getGatewayList() {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        name: '',
        proxy: '',
        enable: false,
        status: 'unknown',
        id: 0
    };

    try {
        let response = await instance.get(BASE_URL);
        // Vue.$log.info('get Permissions Objects', 'response', response);
        if(!response.data.items) response.data.items = [];

        return response.data.items.map(item => {
            return Object.assign({}, defaultObject, item);
        });
    } catch (error) {
        throw error;
    }
}