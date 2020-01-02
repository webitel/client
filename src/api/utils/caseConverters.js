export const objSnakeToCamel = (obj) => {
    let newObj = {};
    if (Array.isArray(obj)) {
        return obj.map(value => {
            if (typeof value === 'object') {
                return objSnakeToCamel(value);
            }
            return value;
        });
    } else {
        Object.keys(obj).forEach(oldKey => {
            const newKey = snakeToCamel(oldKey);
            let value = obj[oldKey];
            if (Array.isArray(value) || (value !== null && value.constructor === Object)) {
                value = objSnakeToCamel(value);
            }
            newObj[newKey] = value;
        });
    }
    return newObj;
};

export const objCamelToSnake = (obj) => {
    let newObj = {};
    if (Array.isArray(obj)) {
        return obj.map(value => {
            if (typeof value === 'object') {
                return objCamelToSnake(value);
            } else {
                return value;
            }
        });
    } else {
        Object.keys(obj).forEach(oldKey => {
            const newKey = camelToSnake(oldKey);
            let value = obj[oldKey];
            if (Array.isArray(value) || (value !== null && value.constructor === Object)) {
                value = objCamelToSnake(value);
            }
            newObj[newKey] = value;
        });
    }
    return newObj;
};

const snakeToCamel = (str) => str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
        .replace('-', '')
        .replace('_', '')
);

const camelToSnake = (str) => str.replace(
    /([A-Z])/g,
    (group) => group.toLowerCase()
        .replace('', '_')
);