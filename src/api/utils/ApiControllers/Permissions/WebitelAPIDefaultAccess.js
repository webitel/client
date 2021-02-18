import instance from '../../../instance';

export default class WebitelAPIDefaultAccess {
  constructor(url) {
    this.url = url;
  }

  async searchObjclassDefaultList(oid, page, size, search) {
    let url = `${this.url}/${oid}`;
    if (search && search.slice(-1) !== '*') search += '*';
    url += `?size=${size}&page=${page}&q=${search}`;
    try {
      const response = await instance.get(url);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async patchDefaultItem(oid, grantorId, rules) {
    const url = `${this.url}/${oid}/grantor/${grantorId}`;
    try {
      await instance.patch(url, rules);
    } catch (err) {
      throw err;
    }
  }

  async toggleObjclassDefaultMode(oid, grantorId, rule) {
    const url = `${this.url}/${oid}/grantor/${grantorId}`;
    try {
      await instance.patch(url, [rule]);
    } catch (err) {
      throw err;
    }
  }
}
