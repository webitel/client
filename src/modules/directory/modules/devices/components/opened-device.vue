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
import type { ApiDevice } from '@webitel/api-services/gen/models';
import { useCardComponent, useCardTabs } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import DevicesRouteNames from '../router/_internals/DevicesRouteNames.enum';
import { generateHotdeskAccount } from '../scripts/generateHotdeskAccount';
import { useDevicesCardStore, useDevicesPermissionsStore } from '../stores';

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
} = useCardComponent<ApiDevice>({
	useCardStore: useDevicesCardStore,
});

const isHotdesk = computed(
	() => route.query.type === 'hotdesk' || !!modelValue.value?.hotdesk,
);

watch(
	[
		isNew,
		debouncedIsLoading,
		isHotdesk,
	],
	() => {
		if (
			!isNew.value ||
			debouncedIsLoading.value ||
			route.query.type !== 'hotdesk' ||
			modelValue.value?.hotdesk
		) {
			return;
		}

		modelValue.value.hotdesk = true;
		modelValue.value.account = generateHotdeskAccount();
		modelValue.value.hotdesks = [];
	},
	{
		immediate: true,
	},
);

const tabs = computed(() => {
	if (isHotdesk.value) {
		return [
			{
				text: t('objects.general'),
				value: 'general',
				pathName: DevicesRouteNames.GENERAL,
			},
			{
				text: t('objects.directory.devices.hotdesk'),
				value: 'hotdesking',
				pathName: DevicesRouteNames.HOTDESKING,
			},
			{
				text: t('objects.directory.devices.phoneInfo'),
				value: 'phone-info',
				pathName: DevicesRouteNames.PHONE_INFO,
			},
		];
	}

	const defaultTabs: {
		text: string;
		value: string;
		pathName: string;
	}[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: DevicesRouteNames.GENERAL,
		},
		{
			text: t('objects.directory.devices.phoneInfo'),
			value: 'phone-info',
			pathName: DevicesRouteNames.PHONE_INFO,
		},
	];

	if (!isNew.value) {
		defaultTabs.push({
			text: t('objects.permissions.permissions', 2),
			value: 'permissions',
			pathName: DevicesRouteNames.PERMISSIONS,
		});
	}

	return defaultTabs;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const permissionsStoreData = computed(() => ({
	store: useDevicesPermissionsStore,
	access: {
		create: hasCreateAccess.value,
		update: hasUpdateAccess.value,
		read: hasReadAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: route.params.id,
}));

const { close } = useClose(RouteNames.DEVICES);

const path = computed(() => [
	{
		name: t('objects.directory.directory'),
	},
	{
		name: t('objects.directory.devices.devices', 2),
		route: '/directory/devices',
	},
	{
		name: isNew.value ? t('reusable.new') : originalItemInstance.value?.name,
	},
]);

const disabledSave = computed(
	() =>
		!hasSaveActionAccess.value ||
		!isAnyFieldEdited.value ||
		hasValidationErrors.value,
);
</script>
