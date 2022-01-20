import {
  EndpointPatcherApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../instance';

export default class APIPermissionsPatcher {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.patcher = new EndpointPatcherApiConsumer({ baseUrl: this.baseUrl, instance });
  }

  async patchItem({ id, changes }) {
    const afterUrl = 'acl';
    return this.patcher.patchItem({ id, changes }, afterUrl);
  }
}
