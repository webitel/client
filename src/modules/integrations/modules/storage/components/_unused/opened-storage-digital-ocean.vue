<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.integrations.storage.digitalOcean') }}
      </h3>
    </header>
    <form class="object-input-grid">
      <form-input
        v-model="keyId"
        :label="$t('objects.integrations.storage.oceanKey')"
        :v="v.itemInstance.properties.keyId"
        required
      />
      <form-input
        v-model="accessKey"
        :label="$t('objects.integrations.storage.oceanAccess')"
        :v="v.itemInstance.properties.accessKey"
        required
      />
      <form-input
        v-model="bucketName"
        :label="$t('objects.integrations.storage.bucket')"
        :v="v.itemInstance.properties.bucketName"
        required
      />
      <dropdown-select
        v-model="region"
        :label="$t('objects.integrations.storage.region')"
        :options="DigitalOceanRegions"
        :v="v.itemInstance.properties.region"
        required
      />
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { DigitalOceanRegions } from '../../api/storage';

export default {
	name: 'OpenedStorageDigitalOcean',
	mixins: [
		openedTabComponentMixin,
	],
	data() {
		return {
			DigitalOceanRegions,
		};
	},

	computed: {
		keyId: {
			get() {
				return this.$store.state.integrations.storage.itemInstance.properties
					.keyId;
			},
			set(value) {
				this.setItemProp({
					prop: 'keyId',
					value,
				});
			},
		},
		accessKey: {
			get() {
				return this.$store.state.integrations.storage.itemInstance.properties
					.accessKey;
			},
			set(value) {
				this.setItemProp({
					prop: 'accessKey',
					value,
				});
			},
		},
		bucketName: {
			get() {
				return this.$store.state.integrations.storage.itemInstance.properties
					.bucketName;
			},
			set(value) {
				this.setItemProp({
					prop: 'bucketName',
					value,
				});
			},
		},
		region: {
			get() {
				return this.$store.state.integrations.storage.itemInstance.properties
					.region;
			},
			set(value) {
				this.setItemProp({
					prop: 'region',
					value,
				});
			},
		},
	},

	methods: {
		...mapActions('integrations/storage', {
			setItemProp: 'SET_ITEM_PROPERTIES_PROPERTY',
		}),
	},
};
</script>

<style lang="scss" scoped>

</style>
