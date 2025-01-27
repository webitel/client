import ObjectsList from '../lookups/ObjectsList.lookup.js';

const convertScope = (initialScope) => {
  let scope = {};
  if (initialScope) {
    // iterate over ObjectsList and collect included classes
    scope = ObjectsList.reduce((objects, object) => {
      const initialScopeObject = initialScope.find(
        (obj) => obj.class === object.field,
      );
      if (initialScopeObject) {
        const newObject = {
          ...object,
          access: initialScopeObject.access,
        };
        return {
          ...objects,
          [object.name]: newObject,
        };
      }
      return objects;
    }, {});
  }

  return scope;
};

export default convertScope;
