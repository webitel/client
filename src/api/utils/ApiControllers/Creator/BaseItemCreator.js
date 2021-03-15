export default class BaseItemCreator {
  constructor({ fieldsToSend, preRequestHandler } = {}) {
    if (fieldsToSend) this.fieldsToSend = fieldsToSend;
    if (preRequestHandler) this.preRequestHandler = preRequestHandler;
  }

  responseHandler = (response) => response;
}
