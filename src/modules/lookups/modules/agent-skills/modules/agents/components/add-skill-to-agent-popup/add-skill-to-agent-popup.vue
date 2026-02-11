<template>
  <div v-show="shown">
    <select-agents-popup
      v-if="isSelectAgentsPopup"
      :skill-id="skillId"
      @cancel="cancel"
      @select="handleSelectAgents"
    />
    <config-agent-skill-popup
      v-if="isAgentConfigSkillPopup"
      @back="handlePopupClose"
      @cancel="cancel"
      @select="handleSkillConfigSelect"
    />
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import AgentSkillsAPI from '../../api/skillAgents';
import ConfigAgentSkillPopup from './config-agent-skill-popup.vue';
import SelectAgentsPopup from './select-agents-popup.vue';

const route = useRoute();

const props = defineProps({
	skillId: {
		type: [
			String,
			Array,
		],
		required: true,
	},
});

const emit = defineEmits([
	'saved',
	'close',
]);

const isSelectAgentsPopup = ref(true);
const isAgentConfigSkillPopup = ref(false);
const shown = ref(false);

const itemInstance = reactive({
	agent: [],
	capacity: 1,
	enabled: false,
});

const isAssign = computed(() => route.query.assign); //For popup tooling

function cancel() {
	handlePopupClose();
	emit('close');
}

function addSkillToAgent(skillId, itemInstance) {
	return AgentSkillsAPI.add({
		parentId: skillId,
		itemInstance,
	});
}

function handleSave(item = itemInstance) {
	const parentIds = Array.isArray(props.skillId)
		? props.skillId
		: [
				props.skillId,
			];
	return Promise.allSettled(
		parentIds.map((parentId) => addSkillToAgent(parentId, item)),
	);
}

function handleSelectAgents(agentIds) {
	itemInstance.agent = agentIds;
	isSelectAgentsPopup.value = false;
	isAgentConfigSkillPopup.value = true;
}

function handlePopupClose() {
	itemInstance.agent = [];
	isAgentConfigSkillPopup.value = false;
	isSelectAgentsPopup.value = true;
}

async function handleSkillConfigSelect({ capacity, enabled }) {
	itemInstance.capacity = capacity;
	itemInstance.enabled = enabled;
	await handleSave(itemInstance);
	handlePopupClose(); // It because we don`t use v-if on this popup in parent component
	emit('saved');
	emit('close');
}
watch(
	isAssign,
	(query) => {
		/**
   I made a popup toggle through a query, because this popup opens on different segments of the route
   (skills and skills/id/agents). Accordingly, the params id new does not work
   **/
		shown.value = !!query;
	},
	{
		immediate: true,
	},
);
</script>

<style lang="scss" scoped>

</style>
