<template>
  <wt-page-wrapper :actions-panel="false">
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
            v-bind="permissionsStoreData"
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
import type { EngineAgent } from '@webitel/api-services/gen/models';
import {
	type CardTab,
	useCardComponent,
	useCardTabs,
} from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import AgentsRouteNames from '../router/_internals/AgentsRouteNames.enum';
import { useAgentsCardStore } from '../stores/card/agentsCardStore';
import { useAgentsPermissionsStore } from '../stores/permissions/agentsPermissionsStore';

const { t } = useI18n();
const route = useRoute();

const {
	hasSaveActionAccess,
	hasReadAccess,
	hasCreateAccess,
	hasUpdateAccess,
	hasDeleteAccess,
} = useUserAccessControl();

const cardStore = useAgentsCardStore();
const { itemId } = storeToRefs(cardStore);

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
} = useCardComponent<EngineAgent>({
	useCardStore: useAgentsCardStore,
});

const tabs = computed(() => {
	const tabs: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: AgentsRouteNames.GENERAL,
		},
		{
			text: t('objects.lookups.skills.skills', 2),
			value: 'skills',
			pathName: AgentsRouteNames.SKILLS,
		},
		{
			text: t('objects.ccenter.queues.queues', 2),
			value: 'queues',
			pathName: AgentsRouteNames.QUEUES,
		},
	];

	if (modelValue.value?.isSupervisor) {
		tabs.push({
			text: t('objects.ccenter.agents.agents', 2),
			value: 'subordinates',
			pathName: AgentsRouteNames.SUBORDINATES,
		});
	}

	if (!isNew.value) {
		tabs.push({
			text: t('objects.permissions.permissions', 2),
			value: 'permissions',
			pathName: AgentsRouteNames.PERMISSIONS,
		});
	}

	return tabs;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const permissionsStoreData = computed(() => ({
	store: useAgentsPermissionsStore,
	access: {
		read: hasReadAccess.value,
		create: hasCreateAccess.value,
		update: hasUpdateAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: itemId.value,
}));

const { close } = useClose(RouteNames.AGENTS);

const path = computed(() => [
	{
		name: t('objects.ccenter.ccenter'),
	},
	{
		name: t('objects.ccenter.agents.agents', 2),
		route: '/contact-center/agents',
	},
	{
		name: isNew.value
			? t('objects.new')
			: originalItemInstance.value?.user?.name,
		route: {
			name: currentTab.value?.pathName,
			query: route.query,
		},
	},
]);

const disabledSave = computed(
	() =>
		!hasSaveActionAccess.value ||
		!isAnyFieldEdited.value ||
		hasValidationErrors.value,
);
</script>
