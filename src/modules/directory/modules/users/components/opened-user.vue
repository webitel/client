<template>
  <wt-page-wrapper :actions-panel="isLogsTab">
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

    <template #actions-panel>
      <logs-filters
        v-if="isLogsTab"
        :namespace="logsFiltersNamespace"
      />
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
import LogsFilters from '../modules/logs/modules/filters/components/opened-user-logs-filters.vue';
import { useHasUserTokensAccess } from '../modules/tokens/composables/hasUserTokensAccess';
import UsersRouteNames from '../routes/_internals/UsersRouteNames.enum';
import { loadUserPasswordRules } from '../stores/_internals/userPasswordRules';
import { useUsersCardStore } from '../stores/card/usersCardStore';
import { useUsersPermissionsStore } from '../stores/permissions/usersPermissionsStore';
import type { User } from '../types/User';

const { t } = useI18n();
const route = useRoute();

const {
	hasReadAccess,
	hasCreateAccess,
	hasUpdateAccess,
	hasDeleteAccess,
	hasSaveActionAccess,
} = useUserAccessControl();
const { hasReadAccess: hasUserTokensReadAccess } = useHasUserTokensAccess();
const { hasReadAccess: hasLogsReadAccess } = useUserAccessControl(
	WtObject.ChangeLog,
);

const cardStore = useUsersCardStore();
const { itemId } = storeToRefs(cardStore);

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
} = useCardComponent<User>({
	useCardStore: useUsersCardStore,
});

loadUserPasswordRules();

const logsFiltersNamespace = 'directory/users/logs/filters';

const tabs = computed(() => {
	const tabs: CardTab[] = [
		{
			text: t('objects.general'),
			value: 'general',
			pathName: UsersRouteNames.GENERAL,
		},
		{
			text: t('objects.directory.users.communications'),
			value: 'communications',
			pathName: UsersRouteNames.COMMUNICATIONS,
		},
		{
			text: t('objects.directory.users.variables'),
			value: 'variables',
			pathName: UsersRouteNames.VARIABLES,
		},
	];

	if (isNew.value) return tabs;

	if (hasUserTokensReadAccess.value) {
		tabs.push({
			text: t('objects.directory.users.tokens'),
			value: 'tokens',
			pathName: UsersRouteNames.TOKENS,
		});
	}

	if (hasLogsReadAccess.value) {
		tabs.push({
			text: t('objects.system.changelogs.changelogs', 2),
			value: 'logs',
			pathName: UsersRouteNames.LOGS,
		});
	}

	tabs.push({
		text: t('objects.permissions.permissions', 2),
		value: 'permissions',
		pathName: UsersRouteNames.PERMISSIONS,
	});

	return tabs;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const isLogsTab = computed(() => currentTab.value?.value === 'logs');

const permissionsStoreData = computed(() => ({
	store: useUsersPermissionsStore,
	access: {
		read: hasReadAccess.value,
		create: hasCreateAccess.value,
		update: hasUpdateAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: itemId.value,
}));

const { close } = useClose(RouteNames.USERS);

const path = computed(() => [
	{
		name: t('objects.directory.directory'),
	},
	{
		name: t('objects.user', 2),
		route: '/directory/users',
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
