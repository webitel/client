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
import type { EngineOutboundResource } from '@webitel/api-services/gen/models';
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
import ResourcesRouteNames from '../router/_internals/ResourcesRouteNames.enum';
import { useResourcesCardStore } from '../stores/card/resourcesCardStore';
import { useResourcesPermissionsStore } from '../stores/permissions/resourcesPermissionsStore';

const { t } = useI18n();
const route = useRoute();

const {
	hasSaveActionAccess,
	hasReadAccess,
	hasCreateAccess,
	hasUpdateAccess,
	hasDeleteAccess,
} = useUserAccessControl();

const resourcesCardStore = useResourcesCardStore();
const { itemId } = storeToRefs(resourcesCardStore);

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	validationFields,
	save,
} = useCardComponent<EngineOutboundResource>({
	useCardStore: useResourcesCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => {
	const tabs: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: ResourcesRouteNames.GENERAL,
		},
		{
			text: t('objects.ccenter.res.numbers', 2),
			value: 'numbers',
			pathName: ResourcesRouteNames.NUMBERS,
		},
		{
			text: t('objects.ccenter.res.failure'),
			value: 'failure',
			pathName: ResourcesRouteNames.FAILURE,
		},
	];

	if (!isNew.value) {
		tabs.push({
			text: t('objects.permissions.permissions', 2),
			value: 'permissions',
			pathName: ResourcesRouteNames.PERMISSIONS,
		});
	}

	return tabs;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const permissionsStoreData = computed(() => ({
	store: useResourcesPermissionsStore,
	access: {
		read: hasReadAccess.value,
		create: hasCreateAccess.value,
		update: hasUpdateAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: itemId.value,
}));

const { close } = useClose(RouteNames.RESOURCES);

const path = computed(() => [
	{
		name: t('objects.ccenter.ccenter'),
	},
	{
		name: t('objects.ccenter.res.res', 2),
		route: '/contact-center/resources',
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
