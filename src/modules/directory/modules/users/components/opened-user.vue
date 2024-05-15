<template>
  <wt-page-wrapper
    :actions-panel="!!currentTab.filters"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <component
        :is="currentTab.filters"
        :namespace="currentTab.filtersNamespace"
      />
    </template>

    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, requiredIf, requiredUnless } from '@vuelidate/validators';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import Logs from '../modules/logs/components/opened-user-logs.vue';
import LogsFilters from '../modules/logs/modules/filters/components/opened-user-logs-filters.vue';
import Tokens from '../modules/tokens/components/opened-user-token.vue';
import Devices from './opened-user-devices.vue';
import General from './opened-user-general.vue';
import License from './opened-user-license.vue';
import Roles from './opened-user-roles.vue';
import Variables from './opened-user-variables.vue';

export default {
  name: 'OpenedUser',
  components: {
    General,
    Roles,
    License,
    Devices,
    Variables,
    Tokens,
    Logs,
    LogsFilters,
  },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'directory/users',
  }),
  validations: {
    itemInstance: {
      username: { required },
      password: {
        required: requiredUnless((value, item) => !!item.id),
      },
      variables: {
        $each: helpers.forEach({
          key: { required: requiredIf((value, item) => !!item.value) },
          value: { required: requiredIf((value, item) => !!item.key) },
        }),
      },
    },
  },

  computed: {
    path() {
      const baseUrl = '/directory/users';
      return [
        { name: this.$t('objects.directory.directory') },
        { name: this.$tc('objects.directory.users.users', 2), route: baseUrl },
        {
          name: this.new ? this.$t('objects.new') : this.pathName,
          route: this.new ? `${baseUrl}/new` : `${baseUrl}/${this.id}`,
        },
      ];
    },

    tabs() {
      const general = {
        text: this.$t('objects.general'),
        value: 'general',
      };
      const roles = {
        text: this.$t('objects.directory.users.roles'),
        value: 'roles',
      };
      const license = {
        text: this.$t('objects.directory.users.license'),
        value: 'license',
      };
      const devices = {
        text: this.$t('objects.directory.users.devices'),
        value: 'devices',
      };
      const variables = {
        text: this.$t('objects.directory.users.variables'),
        value: 'variables',
      };
      const tokens = {
        text: this.$t('objects.directory.users.tokens'),
        value: 'tokens',
      };
      const logs = {
        text: this.$t('objects.system.changelogs.changelogs', 2),
        value: 'logs',
        filters: 'logs-filters',
        filtersNamespace: `${this.namespace}/logs/filters`,
      };

      const tabs = [general, roles, license, devices, variables, tokens];

      if (this.id) tabs.push(logs, this.permissionsTab);
      return tabs;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
