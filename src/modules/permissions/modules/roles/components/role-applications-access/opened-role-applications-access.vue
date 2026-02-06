<template>
  <section class="table-section">
    <application-access-popup
      :namespace="namespace"
      @close="closePopup"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.permissions.roles.applicationsAccess.applicationsAccess', 2) }}
      </h3>
    </header>

    <div class="table-section__table-wrapper">
      <wt-table
        :data="dataList"
        :headers="headers"
        :selectable="false"
      >
        <template #name="{ item }">
          {{ item.displayName }}
        </template>
        <template #access="{ item }">
          <wt-switcher
            :model-value="item.enabled"
            :disabled="disableUserInput"
            @update:model-value="updateAccess({ app: item.name, value: $event })"
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            v-if="item.isEditAction"
            :disabled="disableUserInput || !item.enabled"
            action="edit"
            @click="edit(item)"
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import openedObjectTableTabMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import ApplicationAccessPopup from './opened-role-applications-access-popup.vue';
import { useUserAccessControl } from '../../../../../../app/composables/useUserAccessControl';

export default {
  name: 'OpenedRoleApplicationsAccess',
  components: { ApplicationAccessPopup },
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    dataListValue: [],
    searchValue: '',
  }),
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
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
      get() {
        return this.dataListValue;
      },
      set(value) {
        this.dataListValue = value;
      },
    },
    // override mixin map state
    search: {
      get() {
        return this.searchValue;
      },
      set(value) {
        this.searchValue = value;
      },
    },
    headers() {
      return [
        {
          value: 'name',
          text: this.$t('objects.name'),
        },
        {
          value: 'access',
          text: this.$t('objects.permissions.roles.applicationsAccess.access'),
        },
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
      this.dataList = Object.keys(this.access)
        .filter((app) => app.includes(this.search))
        .map((app) => ({
          name: app,
          displayName: this.$t(this.access[app]._locale),
          enabled: this.access[app]._enabled,
          // "_" prefix is reserved for self configuring
          isEditAction: Object.keys(this.access[app]).filter((key) => key.slice(0, 1) !== '_')
            .length,
        }))
    },
    edit({ name }) {
      this.editedApp = name;
      this.$router.push({
        ...this.$route,
        params: { applicationName: name }
      });
    },
    closePopup() {
      this.$router.go(-1);
    },
    setParentId() { },
  },
};
</script>

<style scoped></style>
