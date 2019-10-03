import {Configuration} from "webitel-sdk";

const configuration = new Configuration({
    basePath: process.env.VUE_APP_API_URL,
    apiKey: "USER_TOKEN",
    accessToken: "USER_TOKEN"
});

export default configuration;