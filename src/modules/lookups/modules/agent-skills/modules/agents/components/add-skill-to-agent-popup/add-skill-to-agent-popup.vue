<template>
 <div>
   <select-agents-popup
     v-if="isSelectAgentsPopup"
     :skill-id="skillId"
     @cancel="cancel"
     @select="handleSelectAgents"
   ></select-agents-popup>
   <config-agent-skill-popup
     v-if="isAgentConfigSkillPopup"
     @close="cancel"
     @back="handleSkillConfigBack"
     @select="handleSkillConfigSelect"
   ></config-agent-skill-popup>
 </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import AgentSkillsAPI from '../../api/skillAgents';
import ConfigAgentSkillPopup from './config-agent-skill-popup.vue';
import SelectAgentsPopup from './select-agents-popup.vue';

const props = defineProps({
  skillId: {
    type: [String, Array],
    required: true,
  },
});

const emit = defineEmits([
  'saved',
  'close',
]);

const isSelectAgentsPopup = ref(true);
const isAgentConfigSkillPopup = ref(false);

const itemInstance = reactive({
  agent: [],
  capacity: 1,
  enabled: false,
});

function cancel() {
  emit('close');
}

function addSkillToAgent(skillId, itemInstance) {
  return AgentSkillsAPI.add({
    parentId: skillId,
    itemInstance,
  });
}

function handleSave(item = itemInstance) {
  const parentIds = Array.isArray(props.skillId) ? props.skillId : [props.skillId];
  return Promise.allSettled(parentIds.map((parentId) => addSkillToAgent(parentId, item)));
}

function handleSelectAgents(agentIds) {
  itemInstance.agent = agentIds;
  isSelectAgentsPopup.value = false;
  isAgentConfigSkillPopup.value = true;
}

function handleSkillConfigBack() {
  itemInstance.agent = [];
  isAgentConfigSkillPopup.value = false;
  isSelectAgentsPopup.value = true;
}

async function handleSkillConfigSelect({ capacity, enabled }) {
  itemInstance.capacity = capacity;
  itemInstance.enabled = enabled;
  await handleSave(itemInstance);
  emit('saved');
  emit('close');
}
</script>

<style lang="scss" scoped>

</style>
