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

  computed: {
    isReadAccess() {
      return store.getters['userinfo/HAS_READ_ACCESS'](this.$route);
    },
    isCreateAccess() {
      return store.getters['userinfo/HAS_CREATE_ACCESS'](this.$route);
    },
    isDeleteAccess() {
      return store.getters['userinfo/HAS_DELETE_ACCESS'](this.$route);
    },
  },
};
