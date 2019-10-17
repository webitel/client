
export const ipValidator = (value) => {
    if (typeof value === 'undefined' || value === null || value === '') {
        return true
    }
    return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
        .test(value);
};

export const gatewayHostValidator = (value) => {
    if (typeof value === 'undefined' || value === null || value === '') {
        return true
    }
    return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
        .test(value) || /^(?=.{1,254}$)((?=[a-z0-9-]{1,63}\.)(xn--+)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}/i
        .test(value);
};

export const requiredArrayValue = (array) => {
    return array.some(value => value);
};
