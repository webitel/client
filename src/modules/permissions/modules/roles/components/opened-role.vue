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
        <template
          v-if="!isNew"
          #primary-action
        >
          <wt-button-select
            :color="disabledSave ? ButtonColor.SECONDARY : ButtonColor.PRIMARY"
            :disabled="disabledSave"
            :options="saveOptions"
            @click="save"
            @click:option="({ callback }) => callback()"
          >
            {{ saveText }}
          </wt-button-select>
        </template>
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
import { RolesAPI } from '@webitel/api-services/api';
import type { RoleCard } from '@webitel/api-services/validations';
import {
	type CardTab,
	useCardComponent,
	useCardTabs,
} from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { useSaveCopy } from '@webitel/ui-sdk/modules/SaveCopy';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import RolesRouteNames from '../router/_internals/RolesRouteNames.enum';
import { useRolesCardStore } from '../stores/card/rolesCardStore';

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
} = useCardComponent<RoleCard>({
	useCardStore: useRolesCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed<CardTab[]>(() => [
	{
		text: t('objects.general'),
		value: 'general',
		pathName: RolesRouteNames.GENERAL,
	},
	{
		text: t('objects.permissions.roles.permissions.permissions', 2),
		value: 'permissions',
		pathName: RolesRouteNames.ROLE_PERMISSIONS,
	},
	{
		text: t(
			'objects.permissions.roles.applicationsAccess.applicationsAccess',
			2,
		),
		value: 'applications-access',
		pathName: RolesRouteNames.APPLICATIONS_ACCESS,
	},
]);

const { currentTab, changeTab } = useCardTabs(tabs);

const { close } = useClose(RouteNames.ROLES);

const path = computed(() => [
	{
		name: t('objects.permissions.permissions'),
	},
	{
		name: t('objects.permissions.permissionsRole', 2),
		route: '/permissions/roles',
	},
	{
		name: isNew.value ? t('objects.new') : originalItemInstance.value?.name,
		route: {
			name: currentTab.value?.pathName,
			query: route.query,
		},
	},
]);

const { saveOptions } = useSaveCopy(() =>
	RolesAPI.add({
		itemInstance: modelValue.value,
	}),
);
</script>
