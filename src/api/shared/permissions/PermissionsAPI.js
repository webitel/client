import APIPermissionsGetter
  from '../../utils/ApiControllers/Permissions/APIPermissionsGetter';
import APIPermissionsPatcher
  from '../../utils/ApiControllers/Permissions/APIPermissionsPatcher';

export default class PermissionsAPI {
  constructor(url) {
    this.url = url;
    this._permissionsGetter = new APIPermissionsGetter(url);
    this._permissionsPatcher = new APIPermissionsPatcher(url);
  }

  static getListByUrl = (url) => {
    const permissionsGetter = new APIPermissionsGetter(url);
    return (params) => permissionsGetter.getList(params);
  };

  static patchByUrl = (url) => {
    const permissionsPatcher = new APIPermissionsPatcher(url);
    return (parentId, item) => permissionsPatcher.patchItem(parentId, item);
  };

  getList(params) {
    return this._permissionsGetter.getList(params);
  }

  patch(parentId, item) {
    return this._permissionsPatcher.patchItem(parentId, item);
  }
}
