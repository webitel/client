<template>
  <select-agents-popup
    v-if="selectedAgents === null"
    :skill-id="skillId"
    @cancel="emit('close')"
    @select="selectAgents"
  />
  <config-agent-skill-popup
    v-else
    @back="selectedAgents = null"
    @cancel="emit('close')"
    @select="assignSkill"
  />
</template>

<script lang="ts" setup>
import { SkillAgentsAPI } from '@webitel/api-services/api';
import type { EngineAgent } from '@webitel/api-services/gen/models';
import { ref } from 'vue';

import ConfigAgentSkillPopup from './config-agent-skill-popup.vue';
import SelectAgentsPopup from './select-agents-popup.vue';

const props = defineProps<{
	skillId: string | number | Array<string | number>;
}>();

const emit = defineEmits<{
	saved: [];
	close: [];
}>();

const selectedAgents = ref<EngineAgent[] | null>(null);

const selectAgents = (agents: EngineAgent[]) => {
	selectedAgents.value = agents;
};

const assignSkill = async ({
	capacity,
	enabled,
}: {
	capacity: number;
	enabled: boolean;
}) => {
	const skillIds = [
		props.skillId,
	].flat();

	await Promise.allSettled(
		skillIds.map((parentId) =>
			SkillAgentsAPI.add({
				parentId,
				itemInstance: {
					agent: selectedAgents.value,
					capacity,
					enabled,
				},
			}),
		),
	);

	emit('saved');
	emit('close');
};
</script>
