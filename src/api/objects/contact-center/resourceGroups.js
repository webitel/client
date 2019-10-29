import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import sanitizer from '@/api/sanitizer';
import {OutboundResourceGroupServiceApiFactory} from 'webitel-sdk';

const resGrService = new OutboundResourceGroupServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;
const fieldsToSend = ['domain_id', 'limit', 'enabled',
    'rps', 'reserve', 'max_successively_errors',
    'name', 'error_ids'];

export const getResGroupList = async (size = 10) => {
    const defaultObject = {
        isSelected: false,
        name: '',
        strategy: '',
        description: '',
        communication: {id: 0},
        id: 0,
    };

    try {
        const response = await resGrService.searchOutboundResourceGroup(0, size, domainId);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return Object.assign({}, defaultObject, item);
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getResGroup = async (id) => {
    try {
        const response = await resGrService.readOutboundResourceGroup(id, domainId);

        const defaultObject = {
            isSelected: false,
            name: '',
            strategy: '',
            description: '',
            communication: {id: 0},
            resList: ['', ''],
            timerange: [
                {
                    start: 540,
                    finish: 1200,
                    limit: 10,
                }
            ],
            id: 0,
        };

        response.data.cps = response.data.rps;
        response.data.maxErrors = response.data.max_successively_errors;
        response.data.error_ids = response.data.error_ids || [];
        response.data.errorIds = response.data.error_ids.map(errCode => {
            return {text: errCode}
        });

        return Object.assign({}, defaultObject, response.data);
    } catch (err) {
        throw err;
    }
};

export async function addResGroup(item) {
    item.domain_id = domainId;
    item.error_ids = Object.values(...item.errorIds);
    item.rps = item.cps;
    item.max_successively_errors = item.maxErrors;

    sanitizer(item, fieldsToSend);
    try {
        await resService.createOutboundResource(item);
    } catch (err) {
        throw err;
    }
}

export async function updateResGroup(id, item) {
    item.error_ids = Object.values(...item.errorIds);
    item.rps = item.cps;
    item.max_successively_errors = item.maxErrors;

    sanitizer(item, fieldsToSend);
    try {
        await resGrService.updateOutboundResourceGroup(id, item);
    } catch (err) {
        throw err;
    }
}

export async function deleteResGroup(id) {
    try {
        await resGrService.deleteOutboundResourceGroup(id, domainId);
    } catch (err) {
        throw err;
    }
}