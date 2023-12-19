import {
  EndpointListGetterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../instance';

export default class APIPermissionsGetter {
  _nestedUrl = 'acl';

  constructor(url) {
    this.baseUrl = url;
    this.listGetter = new EndpointListGetterApiConsumer({
      baseUrl: this.baseUrl,
      instance,
    }, {
      defaultListObject: { user: false },
      listResponseHandler: APIPermissionsGetter.handlePermissionsListResponse,
      nestedUrl: this._nestedUrl,
    });
  }

  static handlePermissionsListResponse(response) {
    const items = response.items.map((item) => ({
      ...item,
      access: {
        x: {
          id: ((item.granted.match(/x/g) || []).length + 1),
          rule: 'x'.repeat((item.granted.match(/x/g) || []).length),
        },
        r: {
          id: ((item.granted.match(/r/g) || []).length + 1),
          rule: 'r'.repeat((item.granted.match(/r/g) || []).length),
        },
        w: {
          id: ((item.granted.match(/w/g) || []).length + 1),
          rule: 'w'.repeat((item.granted.match(/w/g) || []).length),
        },
        d: {
          id: ((item.granted.match(/d/g) || []).length + 1),
          rule: 'd'.repeat((item.granted.match(/d/g) || []).length),
        },
      },
    }));
    return { items, next: response.next };
  }

  async getList(params) {
    return this.listGetter.getNestedList(params);
  }
}
