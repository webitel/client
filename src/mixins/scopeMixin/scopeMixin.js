import store from '../../store/store';

const getObject = (scope, route) => (
  Object.values(scope).find((object) => route.name.includes(object.route))
);

const checkReadAccess = (object) => object.access && object.access.includes('r');

export default {
  beforeRouteEnter(to, from, next) {
    const scope = store.getters['userinfo/GET_SCOPE'];
    const object = getObject(scope, to);
    const isReadAccess = checkReadAccess(object);
    if (isReadAccess) {
      next();
    } else {
      next('/access-denied');
    }
  },
};
