export default class BaseItemGetter {
  constructor({ defaultSingleObject = {}, itemResponseHandler } = {}) {
    const _defaultSingleObject = { _dirty: false };
    this._defaultSingleObject = { ..._defaultSingleObject, ...defaultSingleObject };
    if (itemResponseHandler) this.userResponseHandler = itemResponseHandler;
  }

  responseHandler = (response) => ({ ...this._defaultSingleObject, ...response });
}
