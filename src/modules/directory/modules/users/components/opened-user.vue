<template>
  <wt-page-wrapper :actions-panel="!!currentTab.filters">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="onSave"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <component
        :is="currentTab.filters"
        :namespace="currentTab.filtersNamespace"
      />
    </template>

    <template #main>
      <form
        class="main-container"
        @submit.prevent="onSave"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <router-view
          v-if="isPermissionsTab"
          v-slot="{ Component }"
        >
          <component
            v-if="Component"
            :is="Component"
            v-bind="permissionsStoreData"
          />
        </router-view>
        <component
          v-else
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        />
        <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, requiredIf } from '@vuelidate/validators';
import { WtObject } from '@webitel/ui-sdk/src/enums';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';
import Logs from '../modules/logs/components/opened-user-logs.vue';
import LogsFilters from '../modules/logs/modules/filters/components/opened-user-logs-filters.vue';
import Tokens from '../modules/tokens/components/opened-user-token.vue';
import { useHasUserTokensAccess } from '../modules/tokens/composables/hasUserTokensAccess';
import UsersRouteNames from '../routes/_internals/UsersRouteNames.enum.js';
import { useUsersPermissionsStore } from '../stores/permissions/usersPermissionsStore';
import Communications from './opened-user-communications.vue';
import General from './opened-user-general.vue';
import Variables from './opened-user-variables.vue';

const namespace = 'directory/users';

export default {
	name: 'OpenedUser',
	components: {
		General,
		Communications,
		Variables,
		Tokens,
		Logs,
		LogsFilters,
	},
	mixins: [
		openedObjectMixin,
	],
	/** Kept for the disabled device generation notification, see onSave */
	inject: [
		'$eventBus',
	],

	setup: () => {
		const { t } = useI18n();
		const store = useStore();

		const itemInstance = computed(
			() => getNamespacedState(store.state, namespace).itemInstance,
		);

		/** useVuelidate collects nested validations,
		 *  so that it collects validation from nested user-password-input.vue */
		const v$ = useVuelidate(
			computed(() => ({
				itemInstance: {
					username: {
						required,
					},
					name: {
						required,
					},

					/** see comment above */
					// password: {
					//   required: requiredUnless((value, item) => !!item.id),
					// },
					variables: {
						$each: helpers.forEach({
							key: {
								required: requiredIf((value, item) => !!item.value),
							},
							value: {
								required: requiredIf((value, item) => !!item.key),
							},
						}),
					},
					extension: {
						regex: helpers.withMessage(
							t('objects.directory.users.extensionsHelperText'),
							helpers.regex(/^[0-9]*$/),
						),
					},
				},
			})),
			{
				itemInstance,
			},
			{
				$autoDirty: true,
			},
		);

		const {
			hasReadAccess,
			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,
			hasSaveActionAccess,
			disableUserInput,
		} = useUserAccessControl();

		const { hasReadAccess: hasUserTokensReadAccess } = useHasUserTokensAccess();
		const { hasReadAccess: hasLogsReadAccess } = useUserAccessControl(
			WtObject.ChangeLog,
		);

		return {
			v$,

			hasReadAccess,
			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,
			hasSaveActionAccess,
			disableUserInput,
			hasUserTokensReadAccess,
			hasLogsReadAccess,
		};
	},
	data: () => ({
		namespace,
		permissionsTabPathName: `${UsersRouteNames.PERMISSIONS}-card`,
		passwordRegExp: '',
		validationText: '',
	}),

	computed: {
		isPermissionsTab() {
			return this.$route.name === this.permissionsTabPathName;
		},

		permissionsStoreData() {
			return {
				store: useUsersPermissionsStore,
				access: {
					read: this.hasReadAccess,
					create: this.hasCreateAccess,
					update: this.hasUpdateAccess,
					delete: this.hasDeleteAccess,
				},
				parentId: this.$route.params.id,
			};
		},

		path() {
			const baseUrl = '/directory/users';
			return [
				{
					name: this.$t('objects.directory.directory'),
				},
				{
					name: this.$t('objects.user', 2),
					route: baseUrl,
				},
				{
					name: this.new ? this.$t('objects.new') : this.pathName,
					route: {
						name: this.currentTab.pathName,
						query: this.$route.query,
					},
				},
			];
		},

		tabs() {
			const general = {
				text: this.$t('objects.general'),
				value: 'general',
				pathName: UsersRouteNames.GENERAL,
			};
			const communications = {
				text: this.$t('objects.directory.users.communications'),
				value: 'communications',
				pathName: UsersRouteNames.COMMUNICATIONS,
			};
			const variables = {
				text: this.$t('objects.directory.users.variables'),
				value: 'variables',
				pathName: UsersRouteNames.VARIABLES,
			};
			const logs = {
				text: this.$t('objects.system.changelogs.changelogs', 2),
				value: 'logs',
				filters: 'logs-filters',
				filtersNamespace: `${this.namespace}/logs/filters`,
				pathName: UsersRouteNames.LOGS,
			};
			const tokens = {
				text: this.$t('objects.directory.users.tokens'),
				value: 'tokens',
				pathName: UsersRouteNames.TOKENS,
			};

			const tabs = [
				general,
				communications,
				variables,
			];

			if (this.id && this.hasUserTokensReadAccess) tabs.push(tokens);
			if (this.id && this.hasLogsReadAccess) tabs.push(logs);
			if (this.id) tabs.push(this.permissionsTab);
			return tabs;
		},
	},
	methods: {
		/**
		 * @author @rzaritskyi
		 *
		 * [WTEL-9735](https://webitel.atlassian.net/browse/WTEL-9735)
		 *
		 * Success notification about device generation is temporarily disabled:
		 * the current variant needs rework.
		 * The `objects.directory.users.deviceWasGenerated` message is kept in all locales.
		 */
		async onSave() {
			// const wasGenerating = this.itemInstance.generateDevice;
			await this.save();
			// if (wasGenerating) {
			// 	this.$eventBus.$emit('notification', {
			// 		type: 'success',
			// 		text: this.$t('objects.directory.users.deviceWasGenerated'),
			// 	});
			// }
		},
		close() {
			this.$router.push(`/${this.namespace}`);
		},
	},
};
</script>
