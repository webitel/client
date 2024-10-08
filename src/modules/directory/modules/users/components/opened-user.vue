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
        :namespace="namespace"
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
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, requiredIf } from '@vuelidate/validators';
import { useCardStore } from '@webitel/ui-sdk/store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useAccessControl } from '../../../../../app/mixins/baseMixins/accessControlMixin/useAccessControl.js';
import { useCachedItemInstanceName } from '../../../../../app/mixins/baseMixins/headlineNavMixin/useCachedItemInstanceName.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import Permissions from '../../../../_shared/permissions-tab/components/permissions-tab.vue';
import Logs from '../modules/logs/components/opened-user-logs.vue';
import LogsFilters from '../modules/logs/modules/filters/components/opened-user-logs-filters.vue';
import Tokens from '../modules/tokens/components/opened-user-token.vue';
import UsersRouteNames from '../router/_internals/UsersRouteNames.enum.js';
import Devices from './opened-user-devices.vue';
import General from './opened-user-general.vue';
import License from './opened-user-license.vue';
import Roles from './opened-user-roles.vue';
import Variables from './opened-user-variables.vue';

const namespace = 'directory/users';

// mixins: [openedObjectMixin],

const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const {
  namespace: cardNamespace,
  id,
  itemInstance,

  loadItem,
  addItem,
  updateItem,
  setId,
  resetState,
} = useCardStore(namespace);

const { hasSaveActionAccess } = useAccessControl();

const isLoading = ref(false);

/** useVuelidate collects nested validations,
 *  so that it collects validation from nested user-password-input.vue */
const v$ = useVuelidate(
  computed(() => ({
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
  })),
  { itemInstance },
  { $autoDirty: true },
);

const isNew = computed(() => route.params.id === 'new');

const tabs = computed(() => {
  const general = {
    text: t('objects.general'),
    value: General,
    pathName: UsersRouteNames.GENERAL,
  };
  const roles = {
    text: t('objects.directory.users.roles'),
    value: Roles,
    pathName: UsersRouteNames.ROLES,
  };
  const license = {
    text: t('objects.directory.users.license'),
    value: License,
    pathName: UsersRouteNames.LICENSE,
  };
  const devices = {
    text: t('objects.directory.users.devices'),
    value: Devices,
    pathName: UsersRouteNames.DEVICES,
  };
  const variables = {
    text: t('objects.directory.users.variables'),
    value: Variables,
    pathName: UsersRouteNames.VARIABLES,
  };
  const tokens = {
    text: t('objects.directory.users.tokens'),
    value: Tokens,
    pathName: UsersRouteNames.TOKENS,
  };
  const logs = {
    text: t('objects.system.changelogs.changelogs', 2),
    value: Logs,
    filters: LogsFilters,
    pathName: UsersRouteNames.LOGS,
  };
  const permissions = {
    text: t('objects.permissions.permissions', 2),
    value: Permissions,
    pathName: UsersRouteNames.PERMISSIONS,
  };

  const tabs = [general, roles, license, devices, variables, tokens];

  if (id.value) tabs.push(logs, permissions);
  return tabs;
});

const currentTab = computed(() => {
  return tabs.value.find(({ pathName }) => route.name === pathName) || tabs.value[0];
});

const changeTab = (tab) => {
  return router.push({ ...route, name: tab.pathName });
};

const { name: pathName } = useCachedItemInstanceName(itemInstance);

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

const disabledSave = computed(() => {
  return v$.value.$invalid || !itemInstance.value._dirty;
});

const saveText = computed(() => {
  return isNew.value || itemInstance.value._dirty ? t('objects.save') : t('objects.saved');
});

const redirectToEdit = (_id = id.value) => {
  return router.replace({
    ...route,
    params: { id: _id },
  });
};

const save = async () => {
  if (disabledSave.value) return;

  if (isNew.value) {
    await addItem();
  } else {
    await updateItem();
  }

  if (id.value) {
    await redirectToEdit();
  }
};

async function initializeCard() {
  try {
    isLoading.value = true;

    const { id: itemId } = route.params;
    await setId(itemId);
    await loadItem();
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}

onMounted(() => initializeCard());
onUnmounted(() => resetState());

const close = () => {
  return router.push({ name: RouteNames.USERS });
};
</script>

<style lang="scss" scoped>
</style>
