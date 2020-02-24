export class BaseListGetter {
    default = {_isSelected: false};

    constructor(method, defaultItem) {
        this.method = method;
        this.default = defaultItem || this.default;
    }

    responseHandler = (response) => {
        if (response.items) {
            return {
                list: response.items.map(item => ({...this.default, ...item})),
                next: response.next || false,
            };
        }
        return [];
    }
}