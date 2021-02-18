import { BackendProfileServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import store from '../../../store/store';

const storageService = new BackendProfileServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'maxSize', 'priority', 'properties', 'expireDays', 'type'];
const storageTypes = {
  local: 'local', s3: 's3', g_drive: 'drive', drop_box: 'dropbox',
};
export const AWSRegions = [
  { name: 'EU (Frankfurt)', value: 'eu-central-1' },
  { name: 'EU (Ireland)', value: 'eu-west-1' },
  { name: 'EU (London)', value: 'eu-west-2' },
  { name: 'EU (Paris)', value: 'eu-west-3' },
  { name: 'EU (Stockholm)', value: 'eu-north-1' },
  { name: 'Asia Pacific (Hong Kong)', value: 'ap-east-1' },
  { name: 'Asia Pacific (Mumbai)', value: 'ap-south-1' },
  { name: 'Asia Pacific (Osaka-Local)', value: 'ap-northeast-3' },
  { name: 'Asia Pacific (Seoul)', value: 'ap-northeast-2' },
  { name: 'Asia Pacific (Singapore)', value: 'ap-southeast-1' },
  { name: 'Asia Pacific (Sydney)', value: 'ap-southeast-2' },
  { name: 'Asia Pacific (Tokyo)', value: 'ap-northeast-1' },
  { name: 'US East (Ohio)', value: 'us-east-2' },
  { name: 'US East (N. Virginia)', value: 'us-east-1' },
  { name: 'US West (N. California)', value: 'us-west-1' },
  { name: 'US West (Oregon)', value: 'us-west-2' },
  { name: 'Canada (Central)', value: 'cn-north-1' },
  { name: 'China (Ningxia)', value: 'cn-northwest-1' },
  { name: 'Middle East (Bahrain)', value: 'me-south-1' },
  { name: 'South America (Sao Paulo)', value: 'sa-east-1' },
  { name: 'AWS GovCloud (US-East)', value: 'us-gov-east-1' },
  { name: 'AWS GovCloud (US-West)', value: 'us-gov-west-1' },
];
export const DigitalOceanRegions = [
  { name: 'New York City, United States (NYC1)', value: 'NYC1' },
  { name: 'New York City, United States (NYC2)', value: 'NYC2' },
  { name: 'New York City, United States (NYC3)', value: 'NYC3' },
  { name: 'Amsterdam, the Netherlands 9 (AMS1)', value: 'AMS1' },
  { name: 'Amsterdam, the Netherlands 9 (AMS2)', value: 'AMS2' },
  { name: 'San Francisco, United States (SFO1)', value: 'SFO1' },
  { name: 'San Francisco, United States (SFO2)', value: 'SFO2' },
  { name: 'Singapore (SGP1)', value: 'SGP1' },
  { name: 'London, United Kingdom (LON1)', value: 'LON1' },
  { name: 'Frankfurt, Germany (FRA1)', value: 'FRA1' },
  { name: 'Toronto, Canada (TOR1)', value: 'TOR1' },
  { name: 'Bangalore, India (BLR1)', value: 'BLR1' },
];

export const getStorageList = async (page = 0, size = 10, search) => {
  const { domainId } = store.state.userinfo;
  if (search && search.slice(-1) !== '*') search += '*';
  const defaultObject = {
    _isSelected: false,
    disabled: false,
  };

  try {
    const response = await storageService.searchBackendProfile(page, size, search, domainId);
    if (response.items) {
      return {
        list: response.items.map((item) => ({
          ...defaultObject,
          ...item,
          type: storageTypes[item.type],
        })),
        next: response.next || false,
      };
    }
    return [];
  } catch (err) {
    throw err;
  }
};

export const getStorage = async (id) => {
  const { domainId } = store.state.userinfo;
  const defaultObject = {
    priority: 0,
    _dirty: false,
  };
  try {
    const response = await storageService.readBackendProfile(id, domainId);
    if (response.properties.region) {
      if (response.properties.endpoint.includes('aws')) {
        response.properties.region = AWSRegions.find((item) => item.value === response.properties.region);
      } else if (response.properties.endpoint.includes('digitalocean')) {
        response.properties.region = DigitalOceanRegions.find((item) => item.value === response.properties.region);
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
  const itemCopy = deepCopy(item);
  itemCopy.domainId = store.state.userinfo.domainId;
  if (itemCopy.properties.region && itemCopy.properties.region.value) {
    itemCopy.properties.region = itemCopy.properties.region.value;
  }
  itemCopy.type = Object.keys(storageTypes).find((key) => storageTypes[key] === itemCopy.type);
  sanitizer(itemCopy, fieldsToSend);
  try {
    const response = await storageService.createBackendProfile(itemCopy);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
    return response.id;
  } catch (err) {
    throw err;
  }
};

export const patchStorage = async (id, item) => {
  const itemCopy = deepCopy(item);
  itemCopy.domainId = store.state.userinfo.domainId;
  sanitizer(itemCopy, fieldsToSend);
  try {
    await storageService.patchBackendProfile(id, itemCopy);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
  } catch (err) {
    throw err;
  }
};

export const updateStorage = async (id, item) => {
  const itemCopy = deepCopy(item);
  itemCopy.domainId = store.state.userinfo.domainId;
  if (itemCopy.properties.region && itemCopy.properties.region.value) {
    itemCopy.properties.region = itemCopy.properties.region.value;
  }
  delete itemCopy.type;
  sanitizer(itemCopy, fieldsToSend);

  try {
    await storageService.updateBackendProfile(id, itemCopy);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
  } catch (err) {
    throw err;
  }
};

export const deleteStorage = async (id) => {
  const { domainId } = store.state.userinfo;
  try {
    await storageService.deleteBackendProfile(id, domainId);
  } catch (err) {
    throw err;
  }
};
