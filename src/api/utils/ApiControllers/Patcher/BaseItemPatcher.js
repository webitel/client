export default class BaseItemPatcher {
  constructor(method, fieldsToSend) {
    this.method = method;
    if (this.fieldsToSend) this.fieldsToSend = fieldsToSend;
  }
}
