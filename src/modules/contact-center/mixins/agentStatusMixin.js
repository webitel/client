export default {
	computed: {
		statusIndicatorColor() {
			return {
				online: 'success',
				pause: 'primary',
				offline: 'disabled',
				breakOut: 'secondary',
			};
		},
		statusIndicatorText() {
			return {
				online: this.$t('objects.ccenter.agents.status.online'),
				pause: this.$t('objects.ccenter.agents.status.pause'),
				offline: this.$t('objects.ccenter.agents.status.offline'),
				breakOut: this.$t('objects.ccenter.agents.status.breakOut'),
			};
		},
	},
};
