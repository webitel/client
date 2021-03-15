export default class BaseListGetter {
  default = { _isSelected: false };

  constructor(method, defaultItem, responseHandler) {
    this.method = method;
    this.default = defaultItem || this.default;
    if (responseHandler) this.userResponseHandler = responseHandler;
  }

  responseHandler = (response) => {
    if (response.items) {
      return {
        list: response.items.map((item) => ({ ...this.default, ...item })),
        next: response.next || false,
        isNext: response.next || false, // fixme: remove after nested lists refactor
      };
    }
    // fixme: remove isNext after nested lists refactor with BaseListGetter
    return { list: [], next: false, isNext: false };
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
