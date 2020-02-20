import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {BucketServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import deepCopy from 'deep-copy';
import store from '../../../store/store';
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

const bucketService = new BucketServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/buckets';
const fieldsToSend = ['domainId', 'name', 'description'];

const defaultItemObject = {
    name: '',
    _dirty: false,
};

const listGetter = new WebitelSDKListGetter(bucketService.searchBucket);
const itemGetter = new WebitelSDKItemGetter(bucketService.readBucket, defaultItemObject);
const itemCreator = new WebitelSDKItemCreator(bucketService.createBucket, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(bucketService.updateBucket, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(bucketService.deleteBucket);

export const getBucketsList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getBucket = async (id) => {
    return await itemGetter.getItem(id);
};

export const addBucket = async (item) => {
    return await itemCreator.createItem(item);
};

export const updateBucket = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const deleteBucket = async (id) => {
    return await itemDeleter.deleteItem(id);
};

export const getBucketPermissions = async (id, page = 0, size = 10, search) => {
        // let url = BASE_URL + `?page=${page}size=${size}`;
    let url = BASE_URL + '/' + id + '/acl' + `?size=${size}`;
    if (search) url += `&name=${search}*`;
    try {
        const response = await instance.get(url);
        return coerceObjectPermissionsResponse(response);
    } catch (error) {
        throw error;
    }
};

export const patchBucketPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};