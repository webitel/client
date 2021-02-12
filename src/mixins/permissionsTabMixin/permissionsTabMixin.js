import { mapActions } from 'vuex';
import tableComponentMixin from '../tableComponentMixin';
import AccessMode from '../../store/modules/permissions/objects/_internals/enums/AccessMode.enum';

export default {
  mixins: [tableComponentMixin],
  data: () => ({
    isRoleSelectPopup: false,
  }),
  destroyed() {
    this.resetState();
  },
  computed: {
    dataList() {
      return this.dataListValue.map((item) => {
        const access = {};
        Object.keys(item.access).forEach((rule) => {
          access[rule] = {
            ...item.access[rule],
            name: this.$t(`objects.permissions.object.accessMode.${item.access[rule].id}`),
          };
        });
        return { ...item, access };
      });
    },
    accessOptions() {
      return Object.values(AccessMode).map((mode) => ({
        id: mode,
        name: this.$t(`objects.permissions.object.accessMode.${mode}`),
      }));
    },
  },

  methods: {
    ...mapActions({
      changeCreateAccessMode(dispatch, payload) {
        return dispatch(`${this.namespace}/CHANGE_CREATE_ACCESS_MODE`, payload);
      },
      changeReadAccessMode(dispatch, payload) {
        return dispatch(`${this.namespace}/CHANGE_READ_ACCESS_MODE`, payload);
      },
      changeUpdateAccessMode(dispatch, payload) {
        return dispatch(`${this.namespace}/CHANGE_UPDATE_ACCESS_MODE`, payload);
      },
      changeDeleteAccessMode(dispatch, payload) {
        return dispatch(`${this.namespace}/CHANGE_DELETE_ACCESS_MODE`, payload);
      },
      resetState(dispatch, payload) {
        return dispatch(`${this.namespace}/RESET_ITEM_STATE`, payload);
      },
    }),
    openRoleSelectPopup() {
      this.isRoleSelectPopup = true;
    },
    closeRoleSelectPopup() {
      this.isRoleSelectPopup = false;
    },
  },
};
