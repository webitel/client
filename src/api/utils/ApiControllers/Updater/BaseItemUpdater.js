export default class BaseItemUpdater {
  constructor(method, fieldsToSend, preRequestHandler) {
    this.method = method;
    this.fieldsToSend = fieldsToSend;
    if (preRequestHandler) this.preRequestHandler = preRequestHandler;
  }
}
