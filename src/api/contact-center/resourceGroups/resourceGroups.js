import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '@/api/utils/sanitizer';
import {OutboundResourceGroupServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";

const resGrService = new OutboundResourceGroupServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['domain_id', 'name', 'description', 'strategy', 'communication', 'time'];

export const getResGroupList = async (page = 0, size = 10) => {
    const defaultObject = {
        _isSelected: false,
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
                return {...defaultObject, ...item};
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
            _dirty: false,
        };

        response.data.time = response.data.time.map(range => {
            return {
                start: range.start_time_of_day || 0,
                end: range.end_time_of_day || 0,
            }
        });

        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export async function addResGroup(item) {
    let itemCopy = {...item};
    itemCopy.domain_id = domainId;
    itemCopy.time = itemCopy.time.map(range => {
        return {
            start_time_of_day: range.start,
            end_time_of_day: range.end,
        }
    });
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await resGrService.createOutboundResourceGroup(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
}

export async function updateResGroup(id, item) {
    let itemCopy = {...item};
    itemCopy.time = itemCopy.time.map(range => {
        return {
            start_time_of_day: range.start,
            end_time_of_day: range.end,
        }
    });
    sanitizer(itemCopy, fieldsToSend);
    try {
        await resGrService.updateOutboundResourceGroup(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
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