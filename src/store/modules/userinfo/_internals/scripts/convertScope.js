import { Objects, ObjectsList } from '../enums/Objects.enum';

const convertScope = (initialScope, initialPermissions) => {
  let scope = {};
  if (!initialScope && !initialPermissions) return scope; // if no scope or permissions, return empty object
  if (initialScope) {
    // iterate over ObjectsList and collect included classes
    scope = ObjectsList.reduce((objects, object) => {
      const initialScopeObject = initialScope.find((obj) => obj.class === object.field);
      if (initialScopeObject) {
        const newObject = { ...object, access: initialScopeObject.access };
        return { ...objects, [object.name]: newObject };
      }
      return objects;
    }, {});
  }

  // temporary add full access to lookups and flow permissions as soon as they haven't implemented on backend
  const flow = ObjectsList.find((obj) => obj.name === Objects.FLOW);
  const communications = ObjectsList.find((obj) => obj.name === Objects.COMMUNICATIONS);
  const skills = ObjectsList.find((obj) => obj.name === Objects.SKILLS);
  scope.flow = { ...flow, access: 'rxwd' };
  scope.communications = { ...communications, access: 'rxwd' };
  scope.skills = { ...skills, access: 'rxwd' };

  // if global "ADD" permission, add license and objects pages access
  if (initialPermissions && initialPermissions.find((permission) => permission.id === 'add')) {
    const license = ObjectsList.find((obj) => obj.name === Objects.LICENSE);
    const objects = ObjectsList.find((obj) => obj.name === Objects.OBJECTS);
    scope.license = { ...license, access: 'rxwd' };
    scope.objects = { ...objects, access: 'rxwd' };
  }
  return scope;
};

export default convertScope;
