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
        <template
          v-if="!isNew"
          #primary-action
        >
          <wt-button-select
            :color="disabledSave ? 'secondary' : 'primary'"
            :disabled="disabledSave"
            :options="saveOptions"
            @click="save"
            @click:option="({ callback }) => callback()"
          >
            {{ saveText }}
          </wt-button-select>
        </template>
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
import { TeamsAPI } from '@webitel/api-services/api';
import type { EngineAgentTeam } from '@webitel/api-services/gen/models';
import {
	type CardTab,
	useCardComponent,
	useCardTabs,
} from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { WtObject } from '@webitel/ui-sdk/enums';
import { useSaveCopy } from '@webitel/ui-sdk/modules/SaveCopy';
import { storeToRefs } from 'pinia';
import { computed, toRaw } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import TeamsRouteNames from '../router/_internals/TeamsRouteNames.enum';
import { useTeamsCardStore } from '../stores/card/teamsCardStore';
import { useTeamsPermissionsStore } from '../stores/permissions/teamsPermissionsStore';

const { t } = useI18n();
const route = useRoute();

const {
	hasSaveActionAccess,
	hasReadAccess,
	hasCreateAccess,
	hasUpdateAccess,
	hasDeleteAccess,
} = useUserAccessControl();
const { hasReadAccess: hasAgentsReadAccess } = useUserAccessControl(
	WtObject.Agent,
);
const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);

const { saveOptions } = useSaveCopy(() =>
  TeamsAPI.add({
    itemInstance: {
      ...toRaw(modelValue.value),
    },
  }),
);

const teamsCardStore = useTeamsCardStore();
const { itemId } = storeToRefs(teamsCardStore);

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	validationFields,
	save,
} = useCardComponent<EngineAgentTeam>({
	useCardStore: useTeamsCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => {
	const tabs: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: TeamsRouteNames.GENERAL,
		},
		{
			text: t('objects.ccenter.teams.parameters'),
			value: 'parameters',
			pathName: TeamsRouteNames.PARAMETERS,
		},
		{
			text: t('objects.ccenter.queues.hooks.hooks', 2),
			value: 'hooks',
			pathName: TeamsRouteNames.HOOKS,
		},
	];

	if (hasAgentsReadAccess.value) {
		tabs.push(
			{
				text: t('objects.ccenter.agents.agents', 2),
				value: 'agents',
				pathName: TeamsRouteNames.AGENTS,
			},
			{
				text: t('objects.ccenter.agents.supervisors', 2),
				value: 'supervisors',
				pathName: TeamsRouteNames.SUPERVISORS,
			},
		);
	}

	if (hasFlowsReadAccess.value) {
		tabs.push({
			text: t('objects.routing.flow.flow', 2),
			value: 'flows',
			pathName: TeamsRouteNames.FLOWS,
		});
	}

	if (!isNew.value) {
		tabs.push({
			text: t('objects.permissions.permissions', 2),
			value: 'permissions',
			pathName: TeamsRouteNames.PERMISSIONS,
		});
	}

	return tabs;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const permissionsStoreData = computed(() => ({
	store: useTeamsPermissionsStore,
	access: {
		read: hasReadAccess.value,
		create: hasCreateAccess.value,
		update: hasUpdateAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: itemId.value,
}));

const { close } = useClose(RouteNames.TEAMS);

const path = computed(() => [
	{
		name: t('objects.ccenter.ccenter'),
	},
	{
		name: t('objects.team', 2),
		route: '/contact-center/teams',
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
