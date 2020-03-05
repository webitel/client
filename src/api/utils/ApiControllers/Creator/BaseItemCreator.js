export class BaseItemCreator {
    constructor(method, fieldsToSend, preRequestHandler) {
        this.method = method;
        this.fieldsToSend = fieldsToSend;
        this.preRequestHandler = preRequestHandler;
    }

    responseHandler = (response) => {
        if (response.id) {
            return response.id;
        }
    }
}