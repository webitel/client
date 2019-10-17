import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {CalendarServiceApi, OutboundResourceServiceApiFactory} from 'webitel-sdk';

const resService = new OutboundResourceServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;

export async function getResourceList() {
    const defaultObject = {
        name: '',
        gateway: {
            name: 'gateway default name',
            id: 0
        },
        enabled: false,
        reserve: false,
        id: 0,
    };

    try {
        const response = await resService.searchOutboundResource(domainId, 20);

        return response.data.items.map(item => {
            return Object.assign({}, defaultObject, item);
        });

    } catch (err) {
        throw err;
    }
}
