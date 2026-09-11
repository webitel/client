<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ $t('objects.integrations.storage.dropbox') }}
      </h3>
    </header>
    <form class="opened-card-input-grid">
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
