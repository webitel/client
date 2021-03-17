const proxy = (item) => new Proxy(item, {
  set(obj, prop, value) {
    obj._dirty = true;
    obj[prop] = value;
    return obj;
  },
});

export default proxy;
