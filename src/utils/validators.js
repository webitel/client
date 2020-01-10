export const macValidator = (value) => {
    if (typeof value === 'undefined' || value === null || value === '') {
        return true
    }
    return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/
        .test(value);
};

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
    return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:[0-9]{1,5})?$/
        .test(value) || /^(?=.{1,254}$)((?=[a-z0-9-]{1,63}\.)(xn--+)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}/i
        .test(value);
};

export const requiredArrayValue = (array) => {
    return array.some(value => value);
};

export const timerangeStartLessThanEnd = (object) => {
    return object.start < object.end;
};

export const timerangeNotIntersect = (array) => {
    let isIntersecting = true;
    let ranges = [];
    array.reduce((prev, curr, index, arr) => {
        if(prev.day !== curr.day) {
            ranges = [{start: curr.start, end: curr.end}];
            return prev;
        }
        ranges.forEach(range => {
           if(curr.start > curr.end || curr.end < range.start) isIntersecting = false;
        });
        ranges.push({start: curr.start, end: curr.end});
        return prev;
    });

    return isIntersecting;
};
