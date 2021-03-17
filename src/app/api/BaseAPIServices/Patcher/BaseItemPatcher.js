export default class BaseItemPatcher {
  constructor({ fieldsToSend } = {}) {
    if (this.fieldsToSend) this.fieldsToSend = fieldsToSend;
  }

  // eslint-disable-next-line class-methods-use-this
  _patchItem() {}

  // eslint-disable-next-line class-methods-use-this
  patchItem() {}
}
