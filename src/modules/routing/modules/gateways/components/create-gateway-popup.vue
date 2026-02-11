<template>
  <selection-popup
    v-bind="$attrs"
    :options="options"
    :selected="selected"
    :title="$t('objects.routing.gateways.newGateway')"
    @change="selectOption"
    @close="close"
    @select="createGateway"
  />
</template>

<script>
import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
	name: 'CreateGatewayPopup',
	components: {
		SelectionPopup,
	},
	data: () => ({
		selected: null,
	}),

	computed: {
		options() {
			const register = {
				value: 'reg',
				title: this.$t('objects.routing.gateways.SIPregistrations'),
				usage: this.$t('objects.routing.gateways.SIPregistrationsDescription'),
			};
			const trunking = {
				value: 'trunk',
				title: this.$t('objects.routing.gateways.SIPtrunking'),
				usage: this.$t('objects.routing.gateways.SIPtrunkingDescription'),
			};
			return [
				register,
				trunking,
			];
		},
	},

	created() {
		this.selectOption(this.options[0]);
	},

	methods: {
		selectOption(option) {
			this.selected = option;
		},
		createGateway() {
			if (this.selected) {
				this.$router.push({
					name: `${RouteNames.GATEWAYS}-card`,
					params: {
						id: 'new',
					},
					query: {
						type: this.selected.value,
					},
				});
			}
		},
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
