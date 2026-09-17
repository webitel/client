<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ $t('objects.integrations.storage.local') }}
      </h3>
    </header>
    <form class="opened-card-input-grid">
      <form-input
        v-model="directory"
        :label="$t('objects.integrations.storage.localFolder')"
      />
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
	name: 'OpenedStorageLocal',
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
