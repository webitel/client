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
          v-if="id"
          #primary-action
        >
          <wt-button-select
            :color="disabledSave ? 'secondary' : 'primary'"
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
      <form
        class="opened-card-form"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>

      <save-copy-popup
        :shown="isSaveCopyPopupShown"
        @close="closeSaveCopyPopup"
        @save="saveCopy"
      />
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import {
	SaveCopyPopup,
	useSaveCopyPopup,
} from '@webitel/ui-sdk/modules/SaveCopyPopup';
import { getCurrentInstance } from 'vue';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import RolesAPI from '../api/roles';
import RolesRouteNames from '../router/_internals/RolesRouteNames.enum.js';
import General from './opened-role-general.vue';
import ApplicationsAccess from './role-applications-access/opened-role-applications-access.vue';
import Permissions from './role-permissions/opened-role-permissions.vue';

export default {
	name: 'OpenedRole',
	components: {
		General,
		Permissions,
		ApplicationsAccess,
		SaveCopyPopup,
	},
	mixins: [
		openedObjectMixin,
	],

	setup: () => {
		const v$ = useVuelidate();
		const { hasSaveActionAccess } = useUserAccessControl();

		const instance = getCurrentInstance();
		const saveCopyPopup = useSaveCopyPopup((name) =>
			RolesAPI.add({
				itemInstance: {
					...instance.proxy.itemInstance,
					name,
				},
			}),
		);

		return {
			v$,
			hasSaveActionAccess,
			...saveCopyPopup,
		};
	},
	data: () => ({
		namespace: 'permissions/roles',
		routeName: RouteNames.ROLES,
	}),
	validations: {
		itemInstance: {
			name: {
				required,
			},
		},
	},

	computed: {
		tabs() {
			const tabs = [
				{
					text: this.$t('objects.general'),
					value: 'general',
					pathName: RolesRouteNames.GENERAL,
				},
				{
					text: this.$t('objects.permissions.roles.permissions.permissions', 2),
					value: 'permissions',
					pathName: RolesRouteNames.ROLE_PERMISSIONS,
				},
				{
					text: this.$t(
						'objects.permissions.roles.applicationsAccess.applicationsAccess',
						2,
					),
					value: 'applications-access',
					pathName: RolesRouteNames.APPLICATIONS_ACCESS,
				},
			];
			return tabs;
		},
		path() {
			const baseUrl = '/permissions/roles';
			return [
				{
					name: this.$t('objects.permissions.permissions'),
				},
				{
					name: this.$t('objects.permissions.permissionsRole', 2),
					route: baseUrl,
				},
				{
					name: this.id ? this.pathName : this.$t('objects.new'),
					route: {
						name: this.currentTab.pathName,
						query: this.$route.query,
					},
				},
			];
		},
	},
};
</script>

<style
  lang="scss"
  scoped
></style>
