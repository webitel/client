export default class BaseItemUpdater {
  constructor({ fieldsToSend, preRequestHandler }) {
    if (fieldsToSend) this.fieldsToSend = fieldsToSend;
    if (preRequestHandler) this.preRequestHandler = preRequestHandler;
  }
}
