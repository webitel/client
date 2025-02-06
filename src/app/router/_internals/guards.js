import store from '../../store/store.js';

export const checkAppAccess = (to) => {
  // check for === false because it can be undefined
  if (to.meta.requiresAccess === false) return true;

  const hasReadAccess = store.getters['userinfo/CHECK_APP_ACCESS'](
    store.getters['userinfo/THIS_APP'],
  );
  if (hasReadAccess) {
    return true;
  } else {
    // next('/access-denied');
  }
};

export const checkRouteAccess = (to) => {
  const hasReadAccess = store.getters['userinfo/HAS_READ_ACCESS']({
    route: to,
  });
  // if (hasReadAccess) {
  return true;
  // } else {
  //   console.log('error?');
  // next('/access-denied');
  // }
};
