import store from "../../store/store";
import deepCopy from "deep-copy";
import sanitizer from "./sanitizer";
import eventBus from "../../utils/eventBus";
import instance from "../instance";


class BaseListGetter {
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

class BaseItemGetter {
    default = {_dirty: false};

    constructor(method, defaultItem) {
        this.method = method;
        this.default = defaultItem || this.default;
    }

    responseHandler = (response) => {
        return {...this.default, ...response};
    }
}

class BaseItemCreator {
    constructor(method, fieldsToSend) {
        this.method = method;
        this.fieldsToSend = fieldsToSend;
    }

    responseHandler = (response) => {
        if (response.id) {
            return response.id;
        }
    }
}

class BaseItemUpdater {
    constructor(method, fieldsToSend) {
        this.method = method;
        this.fieldsToSend = fieldsToSend;
    }
}

class BaseItemPatcher {
    constructor(method, fieldsToSend) {
        this.method = method;
        this.fieldsToSend = fieldsToSend;
    }
}

class BaseItemDeleter {
    constructor(method) {
        this.method = method;
    }
}


export class WebitelSDKListGetter extends BaseListGetter {
    constructor() {
        super(...arguments);
    }

    async getList({page, size, search}) {
        const domainId = store.state.userinfo.domainId;
        if (search && search.slice(-1) !== '*') search += '*';
        size = size || 10;

        try {
            const response = await this.method(page, size, search, domainId);
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}

export class WebitelSDKItemGetter extends BaseItemGetter {
    constructor() {
        super(...arguments);
    }

    async getItem(id) {
        const domainId = store.state.userinfo.domainId;

        try {
            const response = await this.method(id, domainId);
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}

export class WebitelSDKItemCreator extends BaseItemCreator {
    constructor() {
        super(...arguments);
    }

    async createItem(item) {
        let itemCopy = deepCopy(item);
        itemCopy.domainId = store.state.userinfo.domainId;
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            const response = await this.method(itemCopy);
            eventBus.$emit('notificationInfo', 'Successfully added');
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}

export class WebitelSDKItemUpdater extends BaseItemUpdater {
    constructor() {
        super(...arguments);
    }

    async updateItem(id, item) {
        let itemCopy = deepCopy(item);
        itemCopy.domainId = store.state.userinfo.domainId;
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            await this.method(id, itemCopy);
            eventBus.$emit('notificationInfo', 'Successfully updated');
        } catch (err) {
            throw err;
        }
    }
}

export class WebitelSDKItemPatcher extends BaseItemPatcher {
    constructor() {
        super(...arguments);
    }

    async patchItem(id, item) {
        let itemCopy = deepCopy(item);
        itemCopy.domainId = store.state.userinfo.domainId;
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            await this.method(id, itemCopy);
            eventBus.$emit('notificationInfo', 'Successfully updated');
        } catch (err) {
            throw err;
        }
    }
}

export class WebitelSDKItemDeleter extends BaseItemDeleter {
    constructor() {
        super(...arguments);
    }

    async deleteItem(id) {
        const domainId = store.state.userinfo.domainId;
        try {
            await this.method(id, domainId);
        } catch (err) {
            throw err;
        }
    }
}


export class WebitelAPIListGetter extends BaseListGetter {
    constructor(url, defaultItem) {
        super(null, defaultItem);
        this.url = url;
    }

    async getList({page, size, search}) {
        if (search && search.slice(-1) !== '*') search += '*';
        size = size || 10;
        let url = this.url + `?size=${size}&page=${page}`;
        if (search) url += `&name=${search}`;

        try {
            const response = await instance.get(url);
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}

export class WebitelAPIItemGetter extends BaseItemGetter {
    constructor(url, defaultItem) {
        super(null, defaultItem);
        this.url = url;
    }

    async getItem(id) {
        const getUrl = this.url+ '/' + id;

        try {
            const response = await instance.get(getUrl);
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}

export class WebitelAPIItemCreator extends BaseItemCreator {
    constructor(url, fieldsToSend) {
        super(null, fieldsToSend);
        this.url = url;
    }

    async createItem(item) {
        let itemCopy = deepCopy(item);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            const response = await instance.post(this.url, {item: itemCopy});
            eventBus.$emit('notificationInfo', 'Successfully added');
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}

export class WebitelAPIItemUpdater extends BaseItemUpdater {
    constructor(url, fieldsToSend) {
        super(null, fieldsToSend);
        this.url = url;
    }

    async updateItem(id, item) {
        const updUrl = this.url + '/' + id;
        let itemCopy = deepCopy(item);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            const response = await instance.put(updUrl, {item: itemCopy});
            eventBus.$emit('notificationInfo', 'Successfully updated');
        } catch (err) {
            throw err;
        }
    }
}

export class WebitelAPIItemDeleter extends BaseItemDeleter {
    constructor(url) {
        super(null);
        this.url = url;
    }

    async deleteItem(id) {
        const delUrl = this.url + '/' + id + "?permanent=true";
        try {
            await instance.delete(delUrl);
            //eventBus.$emit('notificationInfo', 'Sucessfully delted');
        } catch (err) {
            throw err;
        }
    }
}