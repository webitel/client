import ApiListGetter from '../ListGetter/ApiListGetter';

export default class WebitelAPIPermissionsGetter {
  _nestedUrl = 'acl';

  _searchQuery = 'q';

  constructor(url) {
    this.baseUrl = url;
    this.listGetter = new ApiListGetter(this.baseUrl, {
      responseHandler: WebitelAPIPermissionsGetter.handlePermissionsListResponse,
      nestedUrl: this._nestedUrl,
    });
  }

  static handlePermissionsListResponse(response) {
    const list = response.list.map((item) => ({
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
    return { list, next: response.next };
  }

  async getList(params) {
    return this.listGetter.getNestedList({
      searchQuery: this._searchQuery,
      ...params,
    });
  }
}
