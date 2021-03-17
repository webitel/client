export default class BaseListGetter {
  constructor({ defaultListObject = {}, listResponseHandler } = {}) {
    const _defaultListObject = { _isSelected: false };
    this._defaultListObject = { ..._defaultListObject, ...defaultListObject };
    if (listResponseHandler) this.userResponseHandler = listResponseHandler;
  }

  responseHandler = (response) => {
    if (response.items) {
      return {
        list: response.items.map((item) => ({ ...this._defaultListObject, ...item })),
        next: response.next || false,
      };
    }
    return { list: [], next: false };
  };

  // eslint-disable-next-line class-methods-use-this
  _getList() {}

  // eslint-disable-next-line class-methods-use-this
  getList() {}

  setGetListMethod(method) {
    this.getList = method(this._getList.bind(this));
    return this;
  }
}
