<template>
  <wt-page-wrapper :actions-panel="isLogsTab && isLogsFiltersPanelShown">
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
      <trigger-logs-filters-panel />
    </template>

    <template #main>
      <wt-loader v-if="debouncedIsLoading" />
      <form
        v-else
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
            :is="Component"
            v-model="modelValue"
            :validation-fields="validationFields"
            @click:filters="isLogsFiltersPanelShown = !isLogsFiltersPanelShown"
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
import type { TriggerCard } from '@webitel/api-services/validations';
import {
	type CardTab,
	useCardComponent,
	useCardTabs,
} from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import TriggerLogsFiltersPanel from '../modules/logs/components/trigger-logs-filters-panel.vue';
import TriggersRouteNames from '../router/_internals/TriggersRouteNames.enum';
import { useTriggerCardStore } from '../stores/card/triggerCardStore';

const { t } = useI18n();
const route = useRoute();
const { hasSaveActionAccess } = useUserAccessControl();

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	validationFields,
	save,
} = useCardComponent<TriggerCard>({
	useCardStore: useTriggerCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => {
	const array: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: TriggersRouteNames.GENERAL,
		},
		{
			text: t('vocabulary.variables', 2),
			value: 'variables',
			pathName: TriggersRouteNames.VARIABLES,
		},
	];

	// [Claude] a trigger has a running history once it is saved
	if (!isNew.value) {
		array.push({
			text: t('objects.integrations.triggers.logs.logs'),
			value: 'logs',
			pathName: TriggersRouteNames.RUNNING_HISTORY,
		});
	}

	return array;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const isLogsTab = computed(() => currentTab.value?.value === 'logs');
const isLogsFiltersPanelShown = ref(false);

const { close } = useClose(RouteNames.TRIGGERS);

const path = computed(() => [
	{
		name: t('objects.integrations.integrations'),
	},
	{
		name: t('objects.integrations.triggers.triggers', 2),
		route: '/integrations/triggers',
	},
	{
		name: isNew.value ? t('objects.new') : originalItemInstance.value?.name,
		route: {
			name: currentTab.value?.pathName,
			query: route.query,
		},
	},
]);
</script>
