<template>
  <div class="user-status-chips">
    <wt-chip
      v-for="chip in chips"
      :key="chip.status"
      :color="chip.color"
      class="user-status-chips__chip"
    >
      {{ chip.label }}
    </wt-chip>
  </div>
</template>

<script setup lang="ts">
import { UserPresenceStatus } from '@webitel/api-services/enums';
import type { ApiUserPresence } from '@webitel/api-services/gen/models';
import { ChipColor } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';

const props = defineProps<{
	presence?: ApiUserPresence;
}>();

const statusLabels = [
	{
		status: UserPresenceStatus.WEB,
		label: 'Web',
	},
	{
		status: UserPresenceStatus.SIP,
		label: 'SIP',
	},
	{
		status: UserPresenceStatus.DLG,
		label: 'Dlg',
	},
	{
		status: UserPresenceStatus.DND,
		label: 'DnD',
	},
];

const chips = computed(() => {
	const presenceStatus = props.presence?.status ?? '';
	return statusLabels.map(({ status, label }) => ({
		status,
		label,
		color: presenceStatus.includes(status)
			? ChipColor.MAIN
			: ChipColor.SECONDARY,
	}));
});
</script>

<style scoped>
.user-status-chips {
  display: grid;
  grid-template-columns: repeat(4, 70px);
  grid-gap: var(--spacing-sm);
}

.user-status-chips__chip {
  justify-content: center;
}
</style>
