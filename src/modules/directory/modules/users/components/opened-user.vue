<template>
  <wt-page-wrapper :actions-panel="!!currentTab.filters">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-breadcrumb :path="path" />
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
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        />
        <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, requiredIf } from '@vuelidate/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed } from 'vue';
import { useStore } from 'vuex';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import Logs from '../modules/logs/components/opened-user-logs.vue';
import LogsFilters from '../modules/logs/modules/filters/components/opened-user-logs-filters.vue';
import Tokens from '../modules/tokens/components/opened-user-token.vue';
import UsersRouteNames from '../routes/_internals/UsersRouteNames.enum.js';
import Devices from './opened-user-devices.vue';
import General from './opened-user-general.vue';
import License from './opened-user-license.vue';
import Roles from './opened-user-roles.vue';
import Variables from './opened-user-variables.vue';

const namespace = 'directory/users';

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

  setup: () => {
    const store = useStore();

    const itemInstance = computed(
      () => getNamespacedState(store.state, namespace).itemInstance,
    );

    /** useVuelidate collects nested validations,
     *  so that it collects validation from nested user-password-input.vue */
    const v$ = useVuelidate(
      computed(() => ({
        itemInstance: {
          username: { required },
          name: { required },

          /** see comment above */
          // password: {
          //   required: requiredUnless((value, item) => !!item.id),
          // },
          variables: {
            $each: helpers.forEach({
              key: {
                required: requiredIf((value, item) => !!item.value),
              },
              value: {
                required: requiredIf((value, item) => !!item.key),
              },
            }),
          },
        },
      })),
      { itemInstance },
      { $autoDirty: true },
    );

    const pageUserAccessControl = useUserAccessControl();

    return {
      v$,

      hasCreateAccess: pageUserAccessControl.hasCreateAccess,
      hasUpdateAccess: pageUserAccessControl.hasUpdateAccess,

      hasSaveActionAccess: pageUserAccessControl.hasSaveActionAccess,
      disableUserInput: pageUserAccessControl.disableUserInput,
    };
  },
  data: () => ({
    namespace,
    permissionsTabPathName: `${UsersRouteNames.PERMISSIONS}-card`,
    passwordRegExp: '',
    validationText: '',
  }),

  computed: {
    path() {
      const baseUrl = '/directory/users';
      return [
        {
          name: this.$t('objects.directory.directory'),
        },
        {
          name: this.$tc('objects.user', 2),
          route: baseUrl,
        },
        {
          name: this.new ? this.$t('objects.new') : this.pathName,
          route: {
            name: this.currentTab.pathName,
            query: this.$route.query,
          },
        },
      ];
    },

    tabs() {
      const general = {
        text: this.$t('objects.general'),
        value: 'general',
        pathName: UsersRouteNames.GENERAL,
      };
      const roles = {
        text: this.$t('objects.directory.users.roles'),
        value: 'roles',
        pathName: UsersRouteNames.ROLES,
      };
      const license = {
        text: this.$t('objects.directory.users.license'),
        value: 'license',
        pathName: UsersRouteNames.LICENSE,
      };
      const devices = {
        text: this.$t('objects.directory.users.devices'),
        value: 'devices',
        pathName: UsersRouteNames.DEVICES,
      };
      const variables = {
        text: this.$t('objects.directory.users.variables'),
        value: 'variables',
        pathName: UsersRouteNames.VARIABLES,
      };
      const logs = {
        text: this.$t('objects.system.changelogs.changelogs', 2),
        value: 'logs',
        filters: 'logs-filters',
        filtersNamespace: `${this.namespace}/logs/filters`,
        pathName: UsersRouteNames.LOGS,
      };
      const tokens = {
        text: this.$t('objects.directory.users.tokens'),
        value: 'tokens',
        pathName: UsersRouteNames.TOKENS,
      };

      const tabs = [general, roles, license, devices, variables];

      if (this.id) tabs.push(tokens, logs, this.permissionsTab);
      return tabs;
    },
  },
  methods: {
    close() {
      this.$router.push(`/${this.namespace}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
