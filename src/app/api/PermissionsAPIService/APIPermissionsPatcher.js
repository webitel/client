import { EndpointPatcherApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../instance';
import applyTransform, {
  camelToSnake, generateUrl,
  merge, mergeEach, notify,
  sanitize, snakeToCamel,
  starToSearch
} from '@webitel/ui-sdk/src/api/transformers';
import { getDefaultGetListResponse, getDefaultGetParams } from '@webitel/ui-sdk/src/api/defaults';

export default class APIPermissionsPatcher {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    // this.patcher = new EndpointPatcherApiConsumer({
    //   baseUrl: this.baseUrl,
    //   instance,
    // });
    this.patcher = async ({ changes, id }) => {
      const afterUrl = 'acl';
      const body = applyTransform(changes, [
        camelToSnake(),
      ]);
      const url = `${baseUrl}/${id}/${afterUrl}`;
      try {
        const response = await instance.patch(url, body);
        return applyTransform(response.data, [
          snakeToCamel(),
        ]);
      } catch (err) {
        throw applyTransform(err, [
          notify,
        ]);
      }
    };
  }

  async patchItem({ id, changes }) {
    return this.patcher({ id, changes });
  }
}
