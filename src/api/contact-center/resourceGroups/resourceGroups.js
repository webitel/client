import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import sanitizer from '@/api/utils/sanitizer';
import {OutboundResourceGroupServiceApiFactory} from 'webitel-sdk';

const resGrService = new OutboundResourceGroupServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;
const fieldsToSend = ['domain_id', 'name', 'description', 'strategy', 'communication', 'time'];

export const getResGroupList = async (page = 0, size = 10) => {
    const defaultObject = {
        isSelected: false,
        name: '',
        strategy: '',
        description: '',
        communication: {id: 0},
        id: 0,
    };

    try {
        const response = await resGrService.searchOutboundResourceGroup(page, size, domainId);
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
            time: [
                {
                    start: 0,
                    finish: 0,
                }
            ],
            id: 0,
        };

        response.data.time = response.data.time.map(range => {
            return {
                start: range.start_time_of_day || 0,
                end: range.end_time_of_day || 0,
            }
        });

        return Object.assign({}, defaultObject, response.data);
    } catch (err) {
        throw err;
    }
};

export async function addResGroup(item) {
    item.domain_id = domainId;
    item.time = item.time.map(range => {
        return {
            start_time_of_day: range.start,
            end_time_of_day: range.end,
        }
    });
    sanitizer(item, fieldsToSend);
    try {
        const response = await resGrService.createOutboundResourceGroup(item);
        return response.data.id;
    } catch (err) {
        throw err;
    }
}

export async function updateResGroup(id, item) {
    item.time = item.time.map(range => {
        return {
            start_time_of_day: range.start,
            end_time_of_day: range.end,
        }
    });
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

export const getResInGroup = async (resGroupId, page = 0, size = 10) => {
    try {
        const response = await resGrService.searchOutboundResourceInGroup(resGroupId, page, size);
        if (response.data.items) {
            return response.data.items.map(item => {
                return {
                    text: item.resource.name,
                    resId: item.resource.id,
                    group_id: item.group_id,
                    id: item.id,
                }
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const addResInGroup = async (resGroupId, item) => {
    item = {
        group_id: resGroupId,
        resource: {
            name: item.text,
            id: item.resId
        }
    };
    try {
        await resGrService.createOutboundResourceInGroup(resGroupId, item);
    } catch (err) {
        throw err;
    }
};

export const updateResInGroup = async (resGroupId, id, item) => {
    item = {
        id: item.id,
        group_id: resGroupId,
        resource: {
            name: item.text,
            id: item.resId
        }
    };
    try {
        await resGrService.updateOutboundResourceInGroup(resGroupId, id, item);
    } catch (err) {
        throw err;
    }
};

export const deleteResInGroup = async (resGroupId, id) => {
    try {
        await resGrService.deleteOutboundResourceInGroup(resGroupId, id);
    } catch (err) {
        throw err;
    }
};