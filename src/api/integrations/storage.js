import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {BackendProfileServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../utils/eventBus";
import sanitizer from "../utils/sanitizer";
import {objCamelToSnake, objSnakeToCamel} from "../utils/caseConverters";

const storageService = new BackendProfileServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const fieldsToSend = ['name', 'maxSize', 'priority', 'properties', 'expireDays', 'type',];
const storageTypes = {local: 'local', s3: 'aws', do: 'digitalOcean', g_drive: 'drive', drop_box: 'dropbox',};
export const AWSRegions = [
    {name: 'EU (Frankfurt)', value: 'eu-central-1'},
    {name: 'EU (Ireland)', value: 'eu-west-1'},
    {name: 'EU (London)', value: 'eu-west-2'},
    {name: 'EU (Paris)', value: 'eu-west-3'},
    {name: 'EU (Stockholm)', value: 'eu-north-1'},
    {name: 'Asia Pacific (Hong Kong)', value: 'ap-east-1'},
    {name: 'Asia Pacific (Mumbai)', value: 'ap-south-1'},
    {name: 'Asia Pacific (Osaka-Local)', value: 'ap-northeast-3'},
    {name: 'Asia Pacific (Seoul)', value: 'ap-northeast-2'},
    {name: 'Asia Pacific (Singapore)', value: 'ap-southeast-1'},
    {name: 'Asia Pacific (Sydney)', value: 'ap-southeast-2'},
    {name: 'Asia Pacific (Tokyo)', value: 'ap-northeast-1'},
    {name: 'US East (Ohio)', value: 'us-east-2'},
    {name: 'US East (N. Virginia)', value: 'us-east-1'},
    {name: 'US West (N. California)', value: 'us-west-1'},
    {name: 'US West (Oregon)', value: 'us-west-2'},
    {name: 'Canada (Central)', value: 'cn-north-1'},
    {name: 'China (Ningxia)', value: 'cn-northwest-1'},
    {name: 'Middle East (Bahrain)', value: 'me-south-1'},
    {name: 'South America (Sao Paulo)', value: 'sa-east-1'},
    {name: 'AWS GovCloud (US-East)', value: 'us-gov-east-1'},
    {name: 'AWS GovCloud (US-West)', value: 'us-gov-west-1'},
];
export const DigitalOceanRegions = [
    {name: 'New York City, United States (NYC1)', value: 'NYC1'},
    {name: 'New York City, United States (NYC2)', value: 'NYC2'},
    {name: 'New York City, United States (NYC3)', value: 'NYC3'},
    {name: 'Amsterdam, the Netherlands 9 (AMS1)', value: 'AMS1'},
    {name: 'Amsterdam, the Netherlands 9 (AMS2)', value: 'AMS2'},
    {name: 'San Francisco, United States (SFO1)', value: 'SFO1'},
    {name: 'San Francisco, United States (SFO2)', value: 'SFO2'},
    {name: 'Singapore (SGP1)', value: 'SGP1'},
    {name: 'London, United Kingdom (LON1)', value: 'LON1'},
    {name: 'Frankfurt, Germany (FRA1)', value: 'FRA1'},
    {name: 'Toronto, Canada (TOR1)', value: 'TOR1'},
    {name: 'Bangalore, India (BLR1)', value: 'BLR1'},
];

export const getStorageList = async (page = 0, size = 10, search) => {
    const defaultObject = {
        _isSelected: false,
        enabled: false,
    };

    try {
        const response = await storageService.searchBackendProfile(page, size);
        if (!response.data.items) response.data.items = [];
        return response.data.items.map(item => {
            return {
                ...defaultObject,
                ...objSnakeToCamel(item),
                type: storageTypes[item.type],
            }
        });
    } catch (err) {
        throw err;
    }
};

export const getStorage = async (id) => {
    const defaultObject = {
        priority: 0,
        _dirty: false,
    };
    try {
        let response = await storageService.readBackendProfile(id);
        response = objSnakeToCamel(response.data);
        if (response.properties.region) {
            if (response.type === 's3') {
                response.properties.region = AWSRegions.find(item => item.value === response.properties.region);
            } else if (response.type === 'do') {
                response.properties.region = DigitalOceanRegions.find(item => item.value === response.properties.region);
            }
        }
        return {
            ...defaultObject,
            ...response,
            type: storageTypes[response.type],
        };
    } catch (err) {
        throw err;
    }
};

export const addStorage = async (item) => {
    let itemCopy = JSON.parse(JSON.stringify(item));
    if (itemCopy.properties.region) itemCopy.properties.region = itemCopy.properties.region.value;
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);
    itemCopy.type = Object.keys(storageTypes).find(key => storageTypes[key] === itemCopy.type);
    try {
        const response = await storageService.createBackendProfile(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const patchStorage = async (id, changes) => {
    try {
        await storageService.patchBackendProfile(id, changes);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const updateStorage = async (id, item) => {
    let itemCopy = JSON.parse(JSON.stringify(item));
    if (itemCopy.properties.region) itemCopy.properties.region = item.properties.region.value;
    delete itemCopy.type;
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);

    try {
        await storageService.updateBackendProfile(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteStorage = async (id) => {
    try {
        await storageService.deleteBackendProfile(id);
    } catch (err) {
        throw err;
    }
};