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
import type { EngineList } from '@webitel/api-services/gen/models';
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
import BlacklistRouteNames from '../router/_internals/BlacklistRouteNames.enum';
import { useBlacklistsCardStore } from '../stores/card/blacklistsCardStore';
import { useBlacklistsPermissionsStore } from '../stores/permissions/blacklistsPermissionsStore';

const { t } = useI18n();
const route = useRoute();

const {
	hasSaveActionAccess,
	hasReadAccess,
	hasCreateAccess,
	hasUpdateAccess,
	hasDeleteAccess,
} = useUserAccessControl();

const { hasReadAccess: hasListNumbersReadAccess } = useUserAccessControl(
	WtObject.ListNumber,
);

const blacklistsCardStore = useBlacklistsCardStore();
const { itemId } = storeToRefs(blacklistsCardStore);

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	validationFields,
	save,
} = useCardComponent<EngineList>({
	useCardStore: useBlacklistsCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => {
	const tabs: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: BlacklistRouteNames.GENERAL,
		},
	];

	if (hasListNumbersReadAccess.value) {
		tabs.push({
			text: t('objects.lookups.blacklist.number', 2),
			value: 'numbers',
			pathName: BlacklistRouteNames.NUMBERS,
		});
	}

	if (!isNew.value) {
		tabs.push({
			text: t('objects.permissions.permissions', 2),
			value: 'permissions',
			pathName: BlacklistRouteNames.PERMISSIONS,
		});
	}

	return tabs;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const permissionsStoreData = computed(() => ({
	store: useBlacklistsPermissionsStore,
	access: {
		read: hasReadAccess.value,
		create: hasCreateAccess.value,
		update: hasUpdateAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: itemId.value,
}));

const { close } = useClose(RouteNames.BLACKLIST);

const path = computed(() => [
	{
		name: t('objects.lookups.lookups'),
	},
	{
		name: t('objects.lookups.blacklist.blacklist', 2),
		route: '/lookups/blacklist',
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
