import WebitelAPIPermissionsGetter
  from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsGetter';
import WebitelAPIPermissionsPatcher
  from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsPatcher';

export default class PermissionsAPI {
  constructor(url) {
    this.url = url;
    this._permissionsGetter = new WebitelAPIPermissionsGetter(url);
    this._permissionsPatcher = new WebitelAPIPermissionsPatcher(url);
  }

  static getListByUrl = (url) => {
    const permissionsGetter = new WebitelAPIPermissionsGetter(url);
    return (params) => permissionsGetter.getList(params);
  };

  static patchByUrl = (url) => {
    const permissionsPatcher = new WebitelAPIPermissionsPatcher(url);
    return (parentId, item) => permissionsPatcher.patchItem(parentId, item);
  };

  getList(params) {
    return this._permissionsGetter.getList(params);
  }

  patch(parentId, item) {
    return this._permissionsPatcher.patchItem(parentId, item);
  }
}
