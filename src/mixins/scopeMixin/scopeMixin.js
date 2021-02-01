import { mapGetters } from 'vuex';
import store from '../../store/store';

const getObject = (scope, route) => (
  Object.values(scope).find((object) => route.name.includes(object.route))
);

const checkReadAccess = (object) => object.access && object.access.includes('r');

export default {
  data: () => ({
    objectScope: {},
  }),
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
