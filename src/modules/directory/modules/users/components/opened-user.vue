<template>
  <wt-page-wrapper
    class="table-page"
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
        :namespace="namespace"
      />
    </template>

    <template #main>
      <form
        class="opened-card-form"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <router-view v-slot="{ Component }">
          <component
            class="opened-card-tabs__tab"
            :is="Component"
            :namespace="cardNamespace"
            :v="v$"
            :access="{ read: true, edit: !disableUserInput, delete: !disableUserInput, add: !disableUserInput }"
          />
        </router-view>
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { helpers, required, requiredIf } from '@vuelidate/validators';
import { useCardStore } from '@webitel/ui-sdk/src/store/new/index.js';
import { useAccessControl } from '@webitel/ui-sdk/src/composables/useAccessControl/useAccessControl.js';
import { useCardComponent } from '@webitel/ui-sdk/src/composables/useCard/useCardComponent.js';
import { useCardTabs } from '@webitel/ui-sdk/src/composables/useCard/useCardTabs.js';
import { useValidate } from '@webitel/ui-sdk/src/composables/useValidate/useValidate.js';
import { useClose } from '@webitel/ui-sdk/src/composables/useClose/useClose.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import LogsFilters from '../modules/logs/modules/filters/components/opened-user-logs-filters.vue';
import UsersRouteNames from '../router/_internals/UsersRouteNames.enum.js';

const namespace = 'directory/users';
const { t } = useI18n();
const route = useRoute();

/** useVuelidate collects nested validations,
 *  so that it collects validation from nested user-password-input.vue */
const validateSchema = computed(() => ({
  itemInstance: {
    username: { required },

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
}));

const {
  namespace: cardNamespace,
  id,
  itemInstance,
  ...restStore
} = useCardStore(namespace);

const { v$, invalid } = useValidate(validateSchema, { itemInstance });
const { isNew, pathName, disabledSave, saveText, save, initialize } = useCardComponent({...restStore, itemInstance, invalid});
const { hasSaveActionAccess, disableUserInput } = useAccessControl();

const { close } = useClose(RouteNames.USERS);

const tabs = computed(() => {
  const general = {
    text: t('objects.general'),
    value: UsersRouteNames.GENERAL,
    pathName: UsersRouteNames.GENERAL,
  };
  const roles = {
    text: t('objects.directory.users.roles'),
    value: UsersRouteNames.ROLES,
    pathName: UsersRouteNames.ROLES,
  };
  const license = {
    text: t('objects.directory.users.license'),
    value: UsersRouteNames.LICENSE,
    pathName: UsersRouteNames.LICENSE,
  };
  const devices = {
    text: t('objects.directory.users.devices'),
    value: UsersRouteNames.DEVICES,
    pathName: UsersRouteNames.DEVICES,
  };
  const variables = {
    text: t('objects.directory.users.variables'),
    value: UsersRouteNames.VARIABLES,
    pathName: UsersRouteNames.VARIABLES,
  };
  const tokens = {
    text: t('objects.directory.users.tokens'),
    value: UsersRouteNames.TOKENS,
    pathName: UsersRouteNames.TOKENS,
  };
  const logs = {
    text: t('objects.system.changelogs.changelogs', 2),
    filters: LogsFilters,
    value: UsersRouteNames.LOGS,
    pathName: UsersRouteNames.LOGS,
  };
  const permissions = {
    text: t('objects.permissions.permissions', 2),
    value: UsersRouteNames.PERMISSIONS,
    pathName: UsersRouteNames.PERMISSIONS,
  };

  const tabs = [general, roles, license, devices, variables, tokens];

  if (id.value) tabs.push(logs, permissions);
  return tabs;
});

const { currentTab, changeTab } = useCardTabs(tabs.value);

const path = computed(() => {
  const baseUrl = '/directory/users';

  return [
    {
      name: t('objects.directory.directory'),
    },
    {
      name: t('objects.directory.users.users', 2),
      route: baseUrl,
    },
    {
      name: isNew.value ? t('objects.new') : pathName.value,
      route: {
        name: currentTab.value.pathName,
        query: route.query,
      },
    },
  ];
});

initialize();
</script>

<style lang="scss" scoped>
</style>
