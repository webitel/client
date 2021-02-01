import store from '../../store/store';

export default {
  beforeRouteEnter(to, from, next) {
    const isReadAccess = store.getters['userinfo/HAS_READ_ACCESS'](to);
    if (isReadAccess) {
      next();
    } else {
      next('/access-denied');
    }
  },
};
