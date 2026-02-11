<template>
  <selection-popup
    v-bind="$attrs"
    v-model="selected"
    :options="options"
    :title="$t('objects.ccenter.queues.newQueue')"
    @close="$emit('close')"
    @select="createQueue"
  />
</template>

<script>
import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';

export default {
	name: 'CreateQueuePopup',
	components: {
		SelectionPopup,
	},
	data: () => ({
		selected: null,
	}),

	computed: {
		options() {
			return Object.entries(QueueTypeProperties).map(
				([type, { locale, subpath }]) => ({
					value: type, // popup identifies selected option by "value"
					subpath,
					title: this.$t(locale),
					description: this.$t(`${locale}Description`),
				}),
			);
		},
	},

	created() {
		this.selected = this.options[0];
	},

	methods: {
		createQueue() {
			this.$router.push({
				...this.$route,
				name: `${RouteNames.QUEUES}-card`,
				params: {
					id: 'new',
				},
				query: {
					type: this.selected.value,
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
