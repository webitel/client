const throttle = (method, delay = 1000) => {
    let wait = false;
    return (args) => {
        if (!wait) {
            method(args);
            wait = true;
            setTimeout(() => wait = false, delay);
        }
    }
};

export default throttle;