export default class BaseListGetter {
    default = { _isSelected: false };

    constructor(method, defaultItem, responseHandler) {
        this.method = method;
        this.default = defaultItem || this.default;
        if (responseHandler) this.userResponseHandler = responseHandler;
    }

    responseHandler = (response) => {
        if (response.items) {
            return {
                list: response.items.map((item) => ({ ...this.default, ...item })),
                next: response.next || false,
            };
        }
        return [];
    }
}
