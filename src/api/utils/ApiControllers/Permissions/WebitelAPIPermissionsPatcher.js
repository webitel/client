import instance from '../../../instance';

export default class WebitelAPIPermissionsPatcher {
  constructor(url) {
    this.url = url;
  }

  async patchItem(id, rules) {
    const url = `${this.url}/${id}/acl`;
    try {
      await instance.patch(url, rules);
    } catch (err) {
      throw err;
    }
  }
}
