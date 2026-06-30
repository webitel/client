<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="!hasSaveActionAccess || !isAnyFieldEdited || hasValidationErrors"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <wt-loader v-if="debouncedIsLoading" />
      <form
        v-else
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            v-model="modelValue"
            :validation-fields="validationFields"
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

<script setup lang="ts">
import type { ApiOAuthService } from '@webitel/api-services/gen/models';
import { useCardComponent } from '@webitel/ui-datalist/card';
import { useCardTabs, useClose } from '@webitel/ui-sdk/composables';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import SingleSignOnRouteNames from '../router/_internals/SingleSignOnRouteNames.enum';
import { useSingleSignOnCardStore } from '../stores';

const { t } = useI18n();

const { hasSaveActionAccess } = useUserAccessControl();

const {
  modelValue,
  debouncedIsLoading,
  originalItemInstance,
  isNew,
  saveText,
  hasValidationErrors,
  isAnyFieldEdited,
  validationFields,
  save,
} = useCardComponent<ApiOAuthService>({
  useCardStore: useSingleSignOnCardStore,
});

const tabs = computed(() => {
  return [
    {
      text: t('objects.general'),
      value: 'general',
      pathName: SingleSignOnRouteNames.GENERAL,
    },
    {
      text: t('objects.integrations.singleSignOn.mapping'),
      value: 'mapping',
      pathName: SingleSignOnRouteNames.MAPPING,
    },
  ];
});

const { currentTab, changeTab } = useCardTabs(tabs);
const { close } = useClose(RouteNames.SINGLE_SIGN_ON);

const path = computed(() => {
  return [
    {
      name: t('objects.integrations.integrations'),
    },
    {
      name: t('objects.integrations.singleSignOn.singleSignOn'),
      route: '/integrations/single-sign-on',
    },
    {
      name: isNew.value ? t('reusable.new') : originalItemInstance.value?.name,
    },
  ];
});
</script>

<style scoped></style>
