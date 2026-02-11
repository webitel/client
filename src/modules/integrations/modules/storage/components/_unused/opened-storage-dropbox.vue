<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.integrations.storage.dropbox') }}
      </h3>
    </header>
    <form class="object-input-grid">
      <form-input
        v-model="token"
        :label="$t('objects.integrations.storage.dropboxKey')"
        :v="v.itemInstance.properties.token"
        required
      />
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
	name: 'OpenedStorageGeneral',
	mixins: [
		openedTabComponentMixin,
	],

	computed: {
		token: {
			get() {
				return this.$store.state.integrations.storage.itemInstance.properties
					.token;
			},
			set(value) {
				this.setItemProp({
					prop: 'token',
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
