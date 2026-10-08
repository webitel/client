import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

/**
 * @description
 * Colour and label for an agent's status indicator, keyed by the camelCase
 * status. Extracted from `agentStatusMixin`, which several other agent tables
 * still use.
 */
export const useAgentStatusIndicator = () => {
	const { t } = useI18n();

	const statusIndicatorColor: Record<string, string> = {
		online: 'success',
		pause: 'primary',
		offline: 'disabled',
		breakOut: 'break-out',
	};

	const statusIndicatorText = computed<Record<string, string>>(() => ({
		online: t('objects.ccenter.agents.status.online'),
		pause: t('objects.ccenter.agents.status.pause'),
		offline: t('objects.ccenter.agents.status.offline'),
		breakOut: t('objects.ccenter.agents.status.breakOut'),
	}));

	return {
		statusIndicatorColor,
		statusIndicatorText,
	};
};
