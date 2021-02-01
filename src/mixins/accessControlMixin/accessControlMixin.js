import { mapGetters } from 'vuex';
import store from '../../store/store';

export default {
  data: () => ({
    objectScope: {},
  }),
  beforeRouteEnter(to, from, next) {
    const isReadAccess = store.getters['userinfo/HAS_READ_ACCESS'](to);
    if (isReadAccess) {
      next();
    } else {
      next('/access-denied');
    }
  },

  created() {
    this.setCurrentScope();
  },

  computed: {
    ...mapGetters('userinfo', {
      globalScope: 'GET_SCOPE',
    }),
    isReadAccess() {
      return this.objectScope.access.includes('r');
    },
    isDeleteAccess() {
      return this.objectScope.access.includes('d');
    },
  },

  methods: {
    setCurrentScope() {
      this.objectScope = getObject(this.globalScope, this.$route);
    },
  },
};
