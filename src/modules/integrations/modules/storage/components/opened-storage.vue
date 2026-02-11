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
          :is="currentTab.value"
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
import { minValue, required, requiredUnless } from '@vuelidate/validators';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import storageMixin from '../mixins/storageMixin';
import StorageRouteNames from '../router/_internals/StorageRouteNames.enum.js';
import Storage from '../store/_internals/enums/Storage.enum';
import Backblaze from './_unused/opened-storage-backblaze.vue';
import Drive from './_unused/opened-storage-drive.vue';
import Dropbox from './_unused/opened-storage-dropbox.vue';
import Local from './_unused/opened-storage-local.vue';
import General from './opened-storage-general.vue';
import S3 from './opened-storage-s3.vue';

export default {
	name: 'OpenedStorage',
	components: {
		General,
		Local,
		S3,
		Backblaze,
		Dropbox,
		Drive,
	},
	mixins: [
		openedObjectMixin,
		storageMixin,
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
		namespace: 'integrations/storage',
		routeName: RouteNames.STORAGE,
	}),
	validations() {
		const itemInstanceDefaults = {
			name: {
				required,
			},
			expireDays: {
				minValue: minValue(0),
			},
			maxSize: {
				minValue: minValue(0),
			},
			priority: {
				minValue: minValue(0),
			},
		};
		switch (this.$route.params.type) {
			case Storage.LOCAL:
				return {
					itemInstance: {
						...itemInstanceDefaults,
					},
				};
			case Storage.S3:
				return {
					itemInstance: {
						properties: {
							keyId: {
								required,
							},
							accessKey: {
								required: requiredUnless(() => !!this.id),
							},
							bucketName: {
								required,
							},
							region: {
								required,
							},
							endpoint: {
								required,
							},
						},
						...itemInstanceDefaults,
					},
				};
			case Storage.BACKBLAZE:
				return {
					itemInstance: {
						account: {
							required,
						},
						key: {
							required,
						},
						bucket: {
							required,
						},
						bucketId: {
							required,
						},
						...itemInstanceDefaults,
					},
				};
			case Storage.DROPBOX:
				return {
					itemInstance: {
						properties: {
							token: {
								required,
							},
						},
						...itemInstanceDefaults,
					},
				};
			case Storage.DRIVE:
				return {
					itemInstance: {
						properties: {
							directory: {
								required,
							},
							privateKey: {
								required,
							},
							email: {
								required,
							},
						},
						...itemInstanceDefaults,
					},
				};
			default:
				return {};
		}
	},

	computed: {
		storageType() {
			switch (this.$route.params.type) {
				case Storage.LOCAL:
					return Storage.LOCAL;
				case Storage.S3:
					return Storage.S3;
				case Storage.BACKBLAZE:
					return Storage.BACKBLAZE;
				case Storage.DROPBOX:
					return Storage.DROPBOX;
				case Storage.DRIVE:
					return Storage.DRIVE;
				default:
					return '';
			}
		},
		tabs() {
			const tabs = [
				{
					text: this.$t('objects.general'),
					value: 'general',
					pathName: StorageRouteNames.GENERAL,
				},
			];
			switch (this.$route.params.type) {
				case Storage.LOCAL:
					tabs.push({
						text: this.$t('objects.integrations.storage.configuration'),
						value: 'local',
						pathName: StorageRouteNames.LOCAL,
					});
					break;
				case Storage.S3:
					tabs.push({
						text: this.$t('objects.integrations.storage.configuration'),
						value: 's3',
						pathName: StorageRouteNames.S3,
					});
					break;
				case Storage.BACKBLAZE:
					tabs.push({
						text: this.$t('objects.integrations.storage.configuration'),
						value: 'backblaze',
						pathName: StorageRouteNames.BACKBLAZE,
					});
					break;
				case Storage.DROPBOX:
					tabs.push({
						text: this.$t('objects.integrations.storage.configuration'),
						value: 'dropbox',
						pathName: StorageRouteNames.DROPBOX,
					});
					break;
				case Storage.DRIVE:
					tabs.push({
						text: this.$t('objects.integrations.storage.configuration'),
						value: 'drive',
						pathName: StorageRouteNames.DRIVE,
					});
					break;
				default:
			}
			return tabs;
		},

		path() {
			const baseUrl = '/integrations/storage';
			return [
				{
					name: this.$t('objects.integrations.integrations'),
				},
				{
					name: this.$t('objects.integrations.storage.storage'),
					route: baseUrl,
				},
				{
					name: this.id
						? `${this.pathName} (${this.service.name})`
						: this.$t('objects.new'),
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
			return this.loadItem(this.storageType);
		},
	},
};
</script>

<style scoped>

</style>
