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
import type { EngineSkill } from '@webitel/api-services/gen/models';
import {
	type CardTab,
	useCardComponent,
	useCardTabs,
} from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import AgentSkillsRouteNames from '../router/_internals/AgentSkillsRouteNames.enum';
import { useSkillsCardStore } from '../stores/card/skillsCardStore';

const { t } = useI18n();
const route = useRoute();

const { hasSaveActionAccess } = useUserAccessControl();
const { hasReadAccess: hasReadAgentAccess } = useUserAccessControl(
	WtObject.Agent,
);

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	validationFields,
	save,
} = useCardComponent<EngineSkill>({
	useCardStore: useSkillsCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => {
	const tabs: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: AgentSkillsRouteNames.GENERAL,
		},
	];

	if (!isNew.value && hasReadAgentAccess.value) {
		tabs.push({
			text: t('objects.ccenter.agents.agents', 2),
			value: 'agents',
			pathName: AgentSkillsRouteNames.AGENTS,
		});
	}

	return tabs;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const { close } = useClose(RouteNames.SKILLS);

const path = computed(() => [
	{
		name: t('objects.lookups.lookups'),
	},
	{
		name: t('objects.lookups.skills.agentSkills', 2),
		route: '/lookups/skills',
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
