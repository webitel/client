import instance from '../../../instance';

export default class WebitelAPIPermissionsGetter {
  constructor(url) {
    this.url = url;
  }

  async getList({ parentId, page, size, search }) {
    let url = `${this.url}/${parentId}/acl`;
    if (size) url += `?size=${size}`;
    if (page) url += `&page=${page}`;
    if (search && search.slice(-1) !== '*') search += '*';
    if (search) url += `&q=${search}`;

    try {
      const response = await instance.get(url);

      let list = [];
      if (response.items) {
        // format response before assignment
        list = response.items.map((item) => ({
          grantee: {
            id: item.grantee.id,
            name: item.grantee.name,
          },
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
      }

      return { list, next: response.next };
    } catch (err) {
      throw err;
    }
  }
}
