import { mapActions, mapState } from 'vuex';
import openedTabComponentMixin from '../openedObjectTabMixin/openedTabComponentMixin';
import tableComponentMixin from '../objectTableMixin/tableComponentMixin';
import AccessMode
  from '../../../store/modules/permissions/objects/_internals/enums/AccessMode.enum';
import getNamespacedState from '../../../store/helpers/getNamespacedState';

export default {
  mixins: [openedTabComponentMixin, tableComponentMixin],
  data: () => ({
    isRoleSelectPopup: false,
  }),
  destroyed() {
    this.resetState();
  },
  computed: {
    ...mapState({
      parentId(state) {
        return getNamespacedState(state, `${this.namespace}`).itemId;
      },
      dataListValue(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).dataList;
      },
      page(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).page;
      },
      size(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).size;
      },
      search(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).search;
      },
      isNext(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).isNextPage;
      },
    }),
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
      setParentId(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/SET_PARENT_ITEM_ID`, payload);
      },
      loadDataList(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/LOAD_DATA_LIST`, payload);
      },
      setSize(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/SET_SIZE`, payload);
      },
      setSearch(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/SET_SEARCH`, payload);
      },
      nextPage(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/NEXT_PAGE`, payload);
      },
      prevPage(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/PREV_PAGE`, payload);
      },
      changeCreateAccessMode(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/CHANGE_CREATE_ACCESS_MODE`, payload);
      },
      changeReadAccessMode(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/CHANGE_READ_ACCESS_MODE`, payload);
      },
      changeUpdateAccessMode(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/CHANGE_UPDATE_ACCESS_MODE`, payload);
      },
      changeDeleteAccessMode(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/CHANGE_DELETE_ACCESS_MODE`, payload);
      },
      resetState(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/RESET_ITEM_STATE`, payload);
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
