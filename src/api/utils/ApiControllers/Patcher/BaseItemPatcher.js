export default class BaseItemPatcher {
  constructor({ fieldsToSend }) {
    if (this.fieldsToSend) this.fieldsToSend = fieldsToSend;
  }
}
