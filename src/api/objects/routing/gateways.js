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
        if (!response.data.items) response.data.items = [];

        return response.data.items.map(item => {
            return Object.assign({}, defaultObject, item);
        });
    } catch (error) {
        throw error;
    }
}

export async function getGateway(id) {
    const url = BASE_URL + '/' + id;

    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        name: '',
        proxy: '',
        enable: false,
        status: 'unknown',
        id: 0
    };

    try {
        let response = await instance.get(url);
        console.log(response);

        return Object.assign({}, defaultObject, response.data.item);
    } catch (error) {
        throw error;
    }
}