export default class BaseItemUpdater {
  constructor({ fieldsToSend, preRequestHandler } = {}) {
    if (fieldsToSend) this.fieldsToSend = fieldsToSend;
    if (preRequestHandler) this.preRequestHandler = preRequestHandler;
  }

  // eslint-disable-next-line class-methods-use-this
  _updateItem() {}

  // eslint-disable-next-line class-methods-use-this
  updateItem() {}
}
