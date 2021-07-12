<template>
  <section>
    <application-access-popup
      v-if="isApplicationAccessPopup"
      :edited-app="editedApp"
      :namespace="namespace"
      @close="closePopup"
    ></application-access-popup>

    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.permissions.roles.applicationsAccess.applicationsAccess', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          v-model="search"
          debounce
          @enter="loadList"
          @search="loadList"
        ></wt-search-bar>
      </div>
    </header>

    <div class="table-wrapper">
      <wt-table
        :data="dataList"
        :headers="headers"
        :grid-actions="!disableUserInput"
        :selectable="false"
      >
        <template slot="name" slot-scope="{ item }">
          {{ item.displayName }}
        </template>
        <template slot="access" slot-scope="{ item }">
          <wt-switcher
            :value="item.enabled"
            @change="updateAccess({ app: item.name, value: $event })"
          ></wt-switcher>
        </template>
        <template slot="actions" slot-scope="{ item }">
          <edit-action
            v-if="item.isEditAction"
            @click="edit(item)"
          ></edit-action>
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ApplicationAccessPopup from './opened-role-applications-access-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import getNamespacedState from '../../../../../../app/store/helpers/getNamespacedState';

export default {
  name: 'opened-role-applications-access',
  mixins: [openedObjectTableTabMixin],
  components: { ApplicationAccessPopup },
  data: () => ({
    dataListValue: [],
    searchValue: '',
    isApplicationAccessPopup: false,
    editedApp: null,
  }),
  watch: {
    access() {
      this.loadList();
    },
  },
  computed: {
    ...mapState({
      access(state) {
        return getNamespacedState(state, this.namespace).itemInstance.metadata.access;
      },
    }),
    // override mixin map state
    dataList: {
      get() { return this.dataListValue; },
      set(value) { this.dataListValue = value; },
    },
    // override mixin map state
    search: {
      get() { return this.searchValue; },
      set(value) { this.searchValue = value; },
    },
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'access', text: this.$t('objects.permissions.roles.applicationsAccess.access') },
      ];
    },
  },
  methods: {
    ...mapActions({
      updateAccess(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_APPLICATION_ACCESS`, payload);
      },
    }),
    loadList() {
      console.info(this.access);
      this.dataList = Object.keys(this.access)
        .map((app) => ({
          name: app,
          displayName: this.$t(this.access[app]._locale),
          enabled: this.access[app]._enabled,
          // "_" prefix is reserved for self configuring
          isEditAction: Object.keys(this.access[app]).filter((key) => key.slice(0, 1) !== '_').length,
        }))
        .filter((app) => app.name.includes(this.search) || app.displayName.includes(this.search));
    },
    edit({ name }) {
      this.editedApp = name;
      this.openPopup();
    },
    openPopup() {
      this.isApplicationAccessPopup = true;
    },
    closePopup() {
      this.isApplicationAccessPopup = false;
      this.editedApp = null;
    },
    setParentId() {
    },
  },
};
</script>

<style scoped>

</style>
