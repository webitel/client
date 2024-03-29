import AdminSections
  from '@webitel/ui-sdk/src/enums/WebitelApplications/AdminSections.enum';
import ObjectsList from '../lookups/ObjectsList.lookup';

const convertScope = (initialScope) => {
  let scope = {};
  if (initialScope) {
    // iterate over ObjectsList and collect included classes
    scope = ObjectsList.reduce((objects, object) => {
      const initialScopeObject = initialScope.find((obj) => obj.class ===
        object.field);
      if (initialScopeObject) {
        const newObject = { ...object, access: initialScopeObject.access };
        return { ...objects, [object.name]: newObject };
      }
      return objects;
    }, {});
  }

  // temporary add full access to lookups and flow permissions
  // as soon as they haven't implemented on backend
  const flow = ObjectsList.find((obj) => obj.name === AdminSections.FLOW);
  const communications = ObjectsList.find((obj) => obj.name ===
    AdminSections.COMMUNICATIONS);
  const skills = ObjectsList.find((obj) => obj.name === AdminSections.SKILLS);
  const pauseCauses = ObjectsList.find((obj) => obj.name ===
    AdminSections.PAUSE_CAUSE);
  scope.flow = { ...flow, access: 'rxwd' };
  scope.communications = { ...communications, access: 'rxwd' };
  scope.skills = { ...skills, access: 'rxwd' };
  scope.pauseCauses = { ...pauseCauses, access: 'rxwd' };

  return scope;
};

export default convertScope;
