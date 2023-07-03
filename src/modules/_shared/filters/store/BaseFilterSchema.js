const defaultRestore = (value) => value;

export default class BaseFilterSchema {
  constructor({
                value = '',
                defaultValue = '',
                restore = defaultRestore,
              } = {}) {
    this.value = value;
    this.defaultValue = defaultValue;
    this.restore = restore;
  }
}
