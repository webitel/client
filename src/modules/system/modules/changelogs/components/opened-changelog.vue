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
      <changelog-logs-filters-panel />
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
import type { ChangelogCard } from '@webitel/api-services/validations';
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
import ChangelogLogsFiltersPanel from '../modules/logs/components/changelog-logs-filters-panel.vue';
import ChangelogsRouteNames from '../router/_internals/ChangelogsRouteNames.enum';
import { useChangelogsCardStore } from '../stores/card/changelogsCardStore';

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
} = useCardComponent<ChangelogCard>({
	useCardStore: useChangelogsCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => {
	const array: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: ChangelogsRouteNames.GENERAL,
		},
	];

	// [Claude] a changelog has logs once it is saved
	if (!isNew.value) {
		array.push({
			text: t('objects.system.changelogs.logs.logs', 2),
			value: 'logs',
			pathName: ChangelogsRouteNames.LOGS,
		});
	}

	return array;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const isLogsTab = computed(() => currentTab.value?.value === 'logs');
const isLogsFiltersPanelShown = ref(false);

const { close } = useClose(RouteNames.CHANGELOGS);

const path = computed(() => [
	{
		name: t('objects.system.system'),
	},
	{
		name: t('objects.system.changelogs.changelogs', 1),
		route: '/system/changelogs',
	},
	{
		name: isNew.value
			? t('objects.new')
			: originalItemInstance.value?.object?.name,
		route: {
			name: currentTab.value?.pathName,
			query: route.query,
		},
	},
]);
</script>
