<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ $t('objects.integrations.storage.drive') }}
      </h3>
    </header>
    <form class="opened-card-input-grid">
      <form-input
        v-model="directory"
        :label="$t('objects.integrations.storage.driveFolder')"
        :v="v.itemInstance.properties.directory"
        required
      />
      <form-input
        v-model="email"
        :label="$t('objects.integrations.storage.driveEmail')"
        :v="v.itemInstance.properties.email"
        required
      />
      <form-input
        v-model="privateKey"
        :label="$t('objects.integrations.storage.driveKey')"
        :v="v.itemInstance.properties.privateKey"
        required
      />
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
	name: 'OpenedStorageDrive',
	mixins: [
		openedTabComponentMixin,
	],

	computed: {
		directory: {
			get() {
				return this.$store.state.integrations.storage.itemInstance.properties
					.directory;
			},
			set(value) {
				this.setItemProp({
					prop: 'directory',
					value,
				});
			},
		},
		email: {
			get() {
				return this.$store.state.integrations.storage.itemInstance.properties
					.email;
			},
			set(value) {
				this.setItemProp({
					prop: 'email',
					value,
				});
			},
		},
		privateKey: {
			get() {
				return this.$store.state.integrations.storage.itemInstance.properties
					.privateKey;
			},
			set(value) {
				this.setItemProp({
					prop: 'privateKey',
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
