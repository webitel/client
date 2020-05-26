export class BaseItemGetter {
    default = { _dirty: false };

    constructor(method, defaultItem) {
        this.method = method;
        this.default = defaultItem || this.default;
    }

    responseHandler = (response) => ({ ...this.default, ...response })
}
