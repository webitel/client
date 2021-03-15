import ApiPatcher from '../Patcher/ApiPatcher';

export default class WebitelAPIPermissionsPatcher {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.patcher = new ApiPatcher(this.baseUrl);
  }

  async patchItem(id, changes) {
    const afterUrl = 'acl';
    return this.patcher.patchItem(id, changes, afterUrl);
  }
}
