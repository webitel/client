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
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { StorageType } from '@webitel/api-services/enums';
import type { StorageBackendProfile } from '@webitel/api-services/gen/models';
import {
	type CardTab,
	useCardComponent,
	useCardTabs,
} from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { getStorageService } from '../lookups/StorageService.lookup';
import StorageRouteNames from '../router/_internals/StorageRouteNames.enum';
import { useStorageCardStore } from '../stores/card/storageCardStore';

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
} = useCardComponent<StorageBackendProfile>({
	useCardStore: useStorageCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => {
	const array: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: StorageRouteNames.GENERAL,
		},
	];

	// [Claude] only s3 storages can be set up here, other types are edited on the general tab only
	if (modelValue.value.type === StorageType.S3) {
		array.push({
			text: t('objects.integrations.storage.configuration'),
			value: 's3',
			pathName: StorageRouteNames.S3,
		});
	}

	return array;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const { close } = useClose(RouteNames.STORAGE);

const path = computed(() => [
	{
		name: t('objects.integrations.integrations'),
	},
	{
		name: t('objects.integrations.storage.storage'),
		route: '/integrations/storage',
	},
	{
		name: isNew.value
			? t('objects.new')
			: `${originalItemInstance.value?.name} (${getStorageService(originalItemInstance.value?.properties?.endpoint).name})`,
		route: {
			name: currentTab.value?.pathName,
			query: route.query,
		},
	},
]);
</script>
