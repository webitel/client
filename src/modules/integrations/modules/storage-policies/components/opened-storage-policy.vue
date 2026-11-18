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
import type { StoragePolicyCard } from '@webitel/api-services/validations';
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
import { RouteNames } from '../../../../../app/router/_internals/RouteNames.enum';
import StoragePoliciesRouteNames from '../router/_internals/StoragePoliciesRouteNames.enum';
import { useStoragePolicyCardStore } from '../stores/card/storagePolicyCardStore';

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
} = useCardComponent<StoragePolicyCard>({
	useCardStore: useStoragePolicyCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const { close } = useClose(RouteNames.StoragePolicies);

const tabs = computed<CardTab[]>(() => [
	{
		text: t('objects.general'),
		value: 'general',
		pathName: StoragePoliciesRouteNames.GENERAL,
	},
]);

const { currentTab, changeTab } = useCardTabs(tabs);

const path = computed(() => [
	{
		name: t('objects.integrations.integrations'),
	},
	{
		name: t('objects.integrations.storagePolicies.storagePolicies', 2),
		route: '/integrations/storage-policies',
	},
	{
		name: isNew.value ? t('objects.new') : originalItemInstance.value?.name,
		route: {
			name: StoragePoliciesRouteNames.GENERAL,
			query: route.query,
		},
	},
]);
</script>
