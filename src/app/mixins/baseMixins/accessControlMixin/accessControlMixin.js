import store from '../../../store/store';

export default {
  beforeRouteEnter(to, from, next) {
    const hasReadAccess = store.getters['userinfo/HAS_READ_ACCESS']({ route: to });
    if (hasReadAccess) {
      next();
    } else {
      next('/access-denied');
    }
  },

  computed: {
    hasReadAccess() {
      return store.getters['userinfo/HAS_READ_ACCESS']({ route: this.$route });
    },
    hasCreateAccess() {
      return store.getters['userinfo/HAS_CREATE_ACCESS']({ route: this.$route });
    },
    hasEditAccess() {
      return store.getters['userinfo/HAS_EDIT_ACCESS']({ route: this.$route });
    },
    hasDeleteAccess() {
      return store.getters['userinfo/HAS_DELETE_ACCESS']({ route: this.$route });
    },
  },
};
