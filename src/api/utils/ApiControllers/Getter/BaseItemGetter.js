export default class BaseItemGetter {
  default = { _dirty: false };

  constructor(method, defaultItem, responseHandler) {
    this.method = method;
    this.default = defaultItem || this.default;
    if (responseHandler) this.userResponseHandler = responseHandler;
  }

  responseHandler = (response) => ({ ...this.default, ...response });
}
