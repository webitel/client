export default class BaseItemCreator {
    constructor(method, fieldsToSend, preRequestHandler) {
        this.method = method;
        this.fieldsToSend = fieldsToSend;
        if (preRequestHandler) this.preRequestHandler = preRequestHandler;
    }

    responseHandler = (response) => {
        if (response.id) {
            return response.id;
        }
    }
}
