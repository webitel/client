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
import type { GatewayCard } from '@webitel/api-services/validations';
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
import { GatewayType } from '../enums/GatewayType.enum';
import GatewaysRouteNames from '../router/_internals/GatewaysRouteNames.enum';
import { useGatewayCardStore } from '../stores';

const { t } = useI18n();
const route = useRoute();
const { hasSaveActionAccess } = useUserAccessControl();

const gatewayCardStore = useGatewayCardStore();
const { draftItemInstance } = storeToRefs(gatewayCardStore);

/** [Claude] a new gateway takes its type from the create popup; the schema keeps it while filling defaults */
const setNewGatewayType = () => {
	if (route.params.id !== 'new') return;
	draftItemInstance.value = {
		register: route.query.type === GatewayType.Register,
	};
};

setNewGatewayType();

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	validationFields,
	save,
} = useCardComponent<GatewayCard>({
	useCardStore: useGatewayCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const isRegister = computed(() => !!modelValue.value.register);

const tabs = computed(() => {
	const tabs: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: GatewaysRouteNames.GENERAL,
		},
	];
	if (!isRegister.value) {
		tabs.push({
			text: t('objects.routing.configuration'),
			value: 'configuration',
			pathName: GatewaysRouteNames.CONFIGURATION,
		});
	}
	return tabs;
});

const { currentTab, changeTab } = useCardTabs(tabs);
const { close } = useClose(RouteNames.GATEWAYS);

const gatewayTitle = computed(() =>
	isRegister.value
		? t('objects.routing.gateways.registerGateway')
		: t('objects.routing.gateways.trunkingGateway'),
);

const path = computed(() => [
	{
		name: t('objects.routing.routing'),
	},
	{
		name: t('objects.routing.gateways.gateways', 2),
		route: '/routing/gateways',
	},
	{
		name: `${isNew.value ? t('objects.new') : originalItemInstance.value?.name} (${gatewayTitle.value})`,
	},
]);
</script>
