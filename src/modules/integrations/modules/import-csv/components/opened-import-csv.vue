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
            v-if="Component"
            :is="Component"
            v-model="modelValue"
            :validation-fields="validationFields"
            v-bind="isPermissionsTab ? permissionsStoreData : undefined"
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
import type { ImportTemplateCard } from '@webitel/api-services/validations';
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
import ImportCsvRouteNames from '../router/_internals/ImportCsvRouteNames.enum';
import { useImportCsvCardStore } from '../stores/card/importCsvCardStore';
import { useImportCsvPermissionsStore } from '../stores/permissions/importCsvPermissionsStore';

const { t } = useI18n();
const route = useRoute();

const {
	hasSaveActionAccess,
	hasReadAccess,
	hasCreateAccess,
	hasUpdateAccess,
	hasDeleteAccess,
} = useUserAccessControl();

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	validationFields,
	save,
} = useCardComponent<ImportTemplateCard>({
	useCardStore: useImportCsvCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => {
	const array: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: ImportCsvRouteNames.GENERAL,
		},
		{
			text: t('objects.integrations.importCsv.settings'),
			value: 'settings',
			pathName: ImportCsvRouteNames.SETTINGS,
		},
	];

	// [Claude] permissions are granted on a saved template
	if (!isNew.value) {
		array.push({
			text: t('objects.permissions.permissions', 2),
			value: 'permissions',
			pathName: ImportCsvRouteNames.PERMISSIONS,
		});
	}

	return array;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const isPermissionsTab = computed(
	() => route.name === ImportCsvRouteNames.PERMISSIONS,
);

const permissionsStoreData = computed(() => ({
	store: useImportCsvPermissionsStore,
	access: {
		read: hasReadAccess.value,
		create: hasCreateAccess.value,
		update: hasUpdateAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: route.params.id,
}));

const { close } = useClose(RouteNames.IMPORT_CSV);

const path = computed(() => [
	{
		name: t('objects.integrations.integrations'),
	},
	{
		name: t('objects.integrations.importCsv.importCsv'),
		route: '/integrations/import-csv',
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
