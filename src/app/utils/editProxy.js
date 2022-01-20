/* eslint-disable no-param-reassign */
const proxy = (item) => {
  Object.assign(item, { _dirty: false });
  return new Proxy(item, {
    set(obj, prop, value) {
      /* We should reassign original object properties instead of creating new object
      * in order to prevent Vue reactivity issues with this object */
      obj._dirty = true;
      obj[prop] = value;
      return obj;
    },
  });
};

export default proxy;
