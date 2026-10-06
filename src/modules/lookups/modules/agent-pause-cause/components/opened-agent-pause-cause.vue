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
import type { EngineAgentPauseCause } from '@webitel/api-services/gen/models';
import { useCardComponent, useCardTabs } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import AgentPauseCauseRouteNames from '../router/_internals/AgentPauseCauseRouteNames.enum';
import { useAgentPauseCauseCardStore } from '../stores/card/agentPauseCauseCardStore';

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
} = useCardComponent<EngineAgentPauseCause>({
	useCardStore: useAgentPauseCauseCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => [
	{
		text: t('objects.general'),
		value: 'general',
		pathName: AgentPauseCauseRouteNames.GENERAL,
	},
]);

const { currentTab, changeTab } = useCardTabs(tabs);
const { close } = useClose(RouteNames.PAUSE_CAUSE);

const path = computed(() => [
	{
		name: t('objects.lookups.lookups'),
	},
	{
		name: t('objects.lookups.pauseCause.pauseCause'),
		route: '/lookups/pause-cause',
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
