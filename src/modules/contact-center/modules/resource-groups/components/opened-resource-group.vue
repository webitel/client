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
import {
	type CardTab,
	useCardComponent,
	useCardTabs,
} from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { WtObject } from '@webitel/ui-sdk/enums';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import ResourcesGroupsRouteNames from '../router/_internals/ResourcesGroupsRouteNames.enum';
import {
	type ResourceGroupCard,
	useResourceGroupsCardStore,
} from '../stores/card/resourceGroupsCardStore';
import { useResourceGroupsPermissionsStore } from '../stores/permissions/resourceGroupsPermissionsStore';

const { t } = useI18n();
const route = useRoute();

const {
	hasSaveActionAccess,
	hasReadAccess,
	hasCreateAccess,
	hasUpdateAccess,
	hasDeleteAccess,
} = useUserAccessControl();

const { hasReadAccess: hasResourcesReadAccess } = useUserAccessControl(
	WtObject.Resource,
);

const resourceGroupsCardStore = useResourceGroupsCardStore();
const { itemId } = storeToRefs(resourceGroupsCardStore);

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
} = useCardComponent<ResourceGroupCard>({
	useCardStore: useResourceGroupsCardStore,
});

const tabs = computed(() => {
	const tabs: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: ResourcesGroupsRouteNames.GENERAL,
		},
	];

	if (hasResourcesReadAccess.value) {
		tabs.push({
			text: t('objects.ccenter.res.res', 2),
			value: 'resources',
			pathName: ResourcesGroupsRouteNames.RESOURCES,
		});
	}

	tabs.push({
		text: t('objects.ccenter.resGroups.timerange'),
		value: 'timerange',
		pathName: ResourcesGroupsRouteNames.TIME_RANGE,
	});

	if (!isNew.value) {
		tabs.push({
			text: t('objects.permissions.permissions', 2),
			value: 'permissions',
			pathName: ResourcesGroupsRouteNames.PERMISSIONS,
		});
	}

	return tabs;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const permissionsStoreData = computed(() => ({
	store: useResourceGroupsPermissionsStore,
	access: {
		read: hasReadAccess.value,
		create: hasCreateAccess.value,
		update: hasUpdateAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: itemId.value,
}));

const { close } = useClose(RouteNames.RESOURCE_GROUPS);

const path = computed(() => [
	{
		name: t('objects.ccenter.ccenter'),
	},
	{
		name: t('objects.ccenter.resGroups.resGroups', 2),
		route: '/contact-center/resource-groups',
	},
	{
		name: isNew.value ? t('objects.new') : originalItemInstance.value?.name,
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
