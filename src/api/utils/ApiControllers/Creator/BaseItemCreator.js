export default class BaseItemCreator {
  constructor({ fieldsToSend, preRequestHandler } = {}) {
    if (fieldsToSend) this.fieldsToSend = fieldsToSend;
    if (preRequestHandler) this.preRequestHandler = preRequestHandler;
  }

  responseHandler = (response) => response;

  // eslint-disable-next-line class-methods-use-this
  _createItem() {}

  // eslint-disable-next-line class-methods-use-this
  createItem() {}
}
