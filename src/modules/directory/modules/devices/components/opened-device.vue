<template>
  <wt-page-wrapper
    v-if="isInitialized"
    :actions-panel="false"
  >
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
  <wt-loader v-else />
</template>

<script setup lang="ts">
import type { ApiDevice } from '@webitel/api-services/gen/models';
import { useCardComponent, useCardTabs } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { computed, onMounted, onUnmounted, ref, toRaw, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import DevicesRouteNames from '../router/_internals/DevicesRouteNames.enum';
import { generateHotdeskAccount } from '../scripts/generateHotdeskAccount';
import { useDevicesCardStore, useDevicesPermissionsStore } from '../stores';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const {
	hasSaveActionAccess,
	hasDeleteAccess,
	hasCreateAccess,
	hasReadAccess,
	hasUpdateAccess,
} = useUserAccessControl();

const cardStore = useDevicesCardStore();

/**
 * `manualSetup` because a new hotdesk device's shape depends on `?type=hotdesk`,
 * which `createCardStore` knows nothing about. Owning `initialize` here lets
 * hotdesk defaults land after zod defaults — a watch races the async
 * `initialize` continuation and gets overwritten with `hotdesk: false`.
 */
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
	manualSetup: true,
});

const isInitialized = ref(false);

const isHotdesk = computed(
	() => route.query.type === 'hotdesk' || !!modelValue.value?.hotdesk,
);

const applyHotdeskDefaults = () => {
	cardStore.draftItemInstance = {
		...toRaw(cardStore.draftItemInstance),
		hotdesk: true,
		account: generateHotdeskAccount(),
		hotdesks: [],
	};
};

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

/** `useCardRouting` parity, plus query preservation (`?type=hotdesk`) */
const stopIdWatch = watch(
	() => cardStore.itemId,
	(next, prev) => {
		if (next && !prev) {
			router.replace({
				params: {
					...route.params,
					id: String(next),
				},
				query: route.query,
			});
			stopIdWatch();
		}
	},
);

onMounted(async () => {
	await cardStore.initialize({
		itemId: route.params.id as string,
	});

	if (!cardStore.itemId && route.query.type === 'hotdesk') {
		applyHotdeskDefaults();
	}

	isInitialized.value = true;
});

onUnmounted(() => cardStore.$reset());
</script>
