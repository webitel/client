<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="false"
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
        >
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import type { EngineSkillPreset } from '@webitel/api-services/gen/models';
import { useCardComponent } from '@webitel/ui-datalist/card';
import { useActivityTypesCardStore } from '../stores/card/activityTypesCardStroe';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { computed } from 'vue';
import { useCardTabs, useClose } from '@webitel/ui-sdk/composables';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import ActivityTypeRouteNames from '../router/_internals/ActivityTypeRouteNames.enum'

const { t } = useI18n();
const route = useRoute();

const {
  hasSaveActionAccess,
  hasDeleteAccess,
  hasCreateAccess,
  hasReadAccess,
  hasUpdateAccess,
} = useUserAccessControl();

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
} = useCardComponent<EngineSkillPreset>({
  useCardStore: useActivityTypesCardStore,
});

const tabs =  computed(() => [
  {
    text: t('objects.general'),
    value: 'general',
    pathName: ActivityTypeRouteNames.GENERAL,
  },
])

const { currentTab, changeTab } = useCardTabs(tabs);
const { close } = useClose(RouteNames.ACTIVITY_TYPES);

const path = computed(() => [
  {
    name: t('objects.lookups.lookups'),
  },
  {
    name: t('objects.lookups.activityTypes.activityTypes'),
    route: '/lookups/activity-types',
  },
  {
    name: isNew.value ? t('reusable.new') : originalItemInstance.value?.name,
  },
])
</script>