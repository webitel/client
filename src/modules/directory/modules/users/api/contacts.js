import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  merge,
  camelToSnake,
  snakeToCamel,

  notify,
  sanitize,
} from '@webitel/ui-sdk/src/api/transformers';
import { ContactsApiFactory } from 'webitel-sdk';
import configuration from '../../../../../app/api/openAPIConfig';
import instance from '../../../../../app/api/instance';

const service = new ContactsApiFactory(configuration, '', instance);

const getContactsList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'fields'];

  params.fields = [
    'id',
    'name',
  ];

  const listResponseHandler = (items = []) => items.map((item) => ({
    ...item,
    name: item.name.commonName,
  }));

  const transformations = [
    (params) => ({ ...params, q: params.search }),
    merge(getDefaultGetParams()),
    sanitize(fieldsToSend),
    camelToSnake(),
  ];

  const {
    page,
    size,
    q,
    sort,
    fields,
    id,
    name,
  } = applyTransform(params, transformations);
  try {
    const response = await service.searchContacts(
      page,
      size,
      q,
      sort,
      fields,
      id,
      name,
    );
    const { data, next } = applyTransform(response.data, [
      snakeToCamel(),
    ]);
    return {
      items: applyTransform(data, [
        snakeToCamel(),
        listResponseHandler,
        merge(getDefaultGetListResponse()),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getContactsLookup = (params) => getContactsList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const ContactsAPI = {
  getList: getContactsList,
  getLookup: getContactsLookup,
};

export default ContactsAPI;
