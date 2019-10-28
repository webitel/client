import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {CalendarServiceApi, OutboundResourceServiceApiFactory} from 'webitel-sdk';

const resService = new OutboundResourceServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;

export const getResourceList = async (size = 10) => {
    const defaultObject = {
        isSelected: false,
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
        const response = await resService.searchOutboundResource(domainId, size);

        return response.data.items.map(item => {
            return Object.assign({}, defaultObject, item);
        });

    } catch (err) {
        throw err;
    }
}

export const getResource = async (id) => {
    try {
        const response = await resService.readOutboundResource(id, domainId);

        const defaultObject = {
            name: '',
            gateway: {},
            cps: '',
            limit: '',
            description: '',
            numberList: ['1', '2'],
            maxErrors: null,
            errorCodeList: [],
            id: 0
        };

        response.data.cps = response.data.rps;
        delete response.data.rps;
        response.data.maxErrors = response.data.max_successively_errors;
        delete response.data.max_successively_errors;
        response.data.error_ids = response.data.error_ids || [];
        response.data.errorCodeList = response.data.error_ids.map(errCode => {
            return {text: errCode}
        });
        delete response.data.error_ids;

        return Object.assign({}, defaultObject, response.data);
    } catch (err) {
        throw err;
    }
}

// export async function addResource(calendarToSend) {
//     calendarToSend.domain_id = domainId;
//     try {
//         const response = await calendarService.createCalendar(calendarToSend);
//     } catch (err) {
//         throw err;
//     }
// }

// export async function updateResource(calendarToSend) {
//     try {
//         const response = await calendarService.updateCalendar(calendarToSend, calendarToSend.id);
//         return response.data;
//     } catch (err) {
//         throw err;
//     }
// }

// export async function deleteResource(id) {
//     try {
//         const response = await calendarService.deleteCalendar(id, domainId);
//         return response.data;
//     } catch (err) {
//         throw err;
//     }
// }