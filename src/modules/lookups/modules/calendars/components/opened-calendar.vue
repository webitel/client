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
        class="main-container"
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
        >
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { useCardComponent } from '@webitel/ui-datalist/card';
import { useCardTabs, useClose } from '@webitel/ui-sdk/composables';
// import { WebitelLicense } from '@webitel/ui-sdk/modules/Userinfo';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
// import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';
import CalendarRouteNames from '../router/_internals/CalendarRouteNames.enum';
import {
	type CalendarCard,
	useCalendarsCardStore,
	useCalendarsPermissionsStore,
} from '../stores';

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

// const { hasLicense } = useUserinfoStore();
// const hasLicenseOnWfm = computed(() => hasLicense(WebitelLicense.WFM));

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
} = useCardComponent<CalendarCard>({
	useCardStore: useCalendarsCardStore,
});

const tabs = computed(() => {
	const array: {
		text: string;
		value: string;
		pathName: string;
	}[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: CalendarRouteNames.GENERAL,
		},
		{
			text: t('objects.lookups.calendars.workWeek'),
			value: 'work-week',
			pathName: CalendarRouteNames.WORKING_WEEK,
		},
		{
			text: t('objects.lookups.calendars.holidays', 2),
			value: 'holidays',
			pathName: CalendarRouteNames.HOLIDAYS,
		},
	];

	// if (hasLicenseOnWfm.value) {
	// 	array.push({
	// 		text: t('objects.lookups.calendars.specialTime'),
	// 		value: 'special-time',
	// 		pathName: CalendarRouteNames.SPECIAL_TIME,
	// 	});
	// }

	if (!isNew.value) {
		array.push({
			text: t('objects.permissions.permissions', 2),
			value: 'permissions',
			pathName: CalendarRouteNames.PERMISSIONS,
		});
	}

	return array;
});

const { currentTab } = useCardTabs(tabs);

const changeTab = (tab: { pathName?: string }) => {
	if (!tab?.pathName) return;

	return router.push({
		name: tab.pathName,
		params: route.params,
		query: route.query,
	});
};

const isPermissionsTab = computed(
	() => route.name === CalendarRouteNames.PERMISSIONS,
);

const permissionsStoreData = computed(() => ({
	store: useCalendarsPermissionsStore,
	access: {
		create: hasCreateAccess.value,
		update: hasUpdateAccess.value,
		read: hasReadAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: route.params.id,
}));

const { close } = useClose(RouteNames.CALENDARS);

const path = computed(() => [
	{
		name: t('objects.lookups.lookups'),
	},
	{
		name: t('objects.lookups.calendars.calendars', 2),
		route: '/lookups/calendars',
	},
	{
		name: isNew.value ? t('objects.new') : originalItemInstance.value?.name,
	},
]);

const disabledSave = computed(
	() =>
		!hasSaveActionAccess.value ||
		!isAnyFieldEdited.value ||
		hasValidationErrors.value,
);
</script>
