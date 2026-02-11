<template>
  <wt-page-wrapper
    v-if="showPage"
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
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="currentTab && currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, requiredIf, requiredUnless } from '@vuelidate/validators';
import deepmerge from 'deepmerge';
import { StorageProviderType } from 'webitel-sdk';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import CognitiveProfilesRouteNames from '../router/_internals/CognitiveProfilesRouteNames.enum.js';
import ElevenLabs from './eleven-labs/opened-cognitive-profile-eleven-labs.vue';
import Google from './google/opened-cognitive-profile-google.vue';
import Microsoft from './microsoft/opened-cognitive-profile-microsoft.vue';

export default {
	name: 'OpenedCognitiveProfile',
	components: {
		Microsoft,
		Google,
		ElevenLabs,
	},
	mixins: [
		openedObjectMixin,
	],

	setup: () => {
		const v$ = useVuelidate();
		const { hasSaveActionAccess } = useUserAccessControl();
		return {
			v$,
			hasSaveActionAccess,
		};
	},
	data: () => ({
		namespace: 'integrations/cognitiveProfiles',
		routeName: RouteNames.COGNITIVE_PROFILES,
		permissionsTabPathName: CognitiveProfilesRouteNames.PERMISSIONS,
	}),
	validations() {
		const defaults = {
			itemInstance: {
				name: {
					required,
				},
				service: {
					required,
				},
				provider: {
					required,
				},
			},
		};
		switch (this.provider) {
			case StorageProviderType.Microsoft:
				return deepmerge(defaults, {
					itemInstance: {
						properties: {
							key: {
								required: requiredUnless(() => !!this.id),
							},
							region: {
								required,
							},
						},
					},
				});
			case StorageProviderType.Google:
				return deepmerge(defaults, {
					itemInstance: {
						properties: {
							key: {
								required: requiredIf(() => {
									return !this.itemInstance.properties.keyFilename && !!this.id;
								}),
							},
						},
					},
				});
			case StorageProviderType.ElevenLabs:
				return deepmerge(defaults, {
					itemInstance: {
						properties: {
							key: {
								required: requiredUnless(() => !!this.id),
							},
						},
					},
				});
			default:
				return defaults;
		}
	},

	computed: {
		showPage() {
			return this.provider !== null;
		},
		provider() {
			return this.itemInstance.provider;
		},
		tabs() {
			const microsoft = {
				text: StorageProviderType.Microsoft,
				value: 'Microsoft',
				pathName: CognitiveProfilesRouteNames.GENERAL,
			};

			const google = {
				text: StorageProviderType.Google,
				value: 'Google',
				pathName: CognitiveProfilesRouteNames.GENERAL,
			};

			const elevenLabs = {
				text: StorageProviderType.ElevenLabs,
				value: 'ElevenLabs',
				pathName: CognitiveProfilesRouteNames.GENERAL,
			};

			const tabs = [];
			if (this.provider === StorageProviderType.Microsoft) tabs.push(microsoft);
			else if (this.provider === StorageProviderType.Google) tabs.push(google);
			else if (this.provider === StorageProviderType.ElevenLabs)
				tabs.push(elevenLabs);
			if (this.id) tabs.push(this.permissionsTab);
			return tabs;
		},

		path() {
			const baseUrl = '/integrations/cognitive-profiles';
			return [
				{
					name: this.$t('objects.integrations.integrations'),
				},
				{
					name: this.$t(
						'objects.integrations.cognitiveProfiles.cognitiveProfiles',
						2,
					),
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
	methods: {
		async loadPageData() {
			await this.setId(this.$route.params.id);
			await this.loadItem(this.$route.query.type);
			this.setInitialTab();
		},
	},
};
</script>

<style scoped></style>
