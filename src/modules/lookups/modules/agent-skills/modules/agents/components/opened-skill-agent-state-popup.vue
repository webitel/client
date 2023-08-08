<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $t('objects.lookups.skills.selectCapacityAndState') }}
    </template>
    <template v-slot:main>
      <div class="state-change-content">
        <wt-input
          v-model="agentsState.capacity"
          :label="$t('objects.lookups.skills.capacity')"
          class="state-change-content__input"
          type="number"
        ></wt-input>
        <wt-switcher
          v-model="agentsState.enabled"
          :label="$t('objects.lookups.skills.state')"
          :labelLeft="true"
        >
        </wt-switcher>
      </div>
    </template>
    <template v-slot:actions>
      <wt-button
        @click="changeAgentsState"
      >{{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="previousAgentStatePopup"
      >
        {{ $t('objects.back') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
export default {
  name: 'opened-skill-agent-popup',
  emits: ['previousAgentStatePopup', 'changeAgentsState'],
  data: () => ({
    namespace: 'lookups/skills',
    subNamespace: 'agents',
    agentCapacity: 1,
    agentState: true,
    agentsState: {
      capacity: 1,
      enabled: false,
    },
  }),
  methods: {
    previousAgentStatePopup() {
      this.$emit('previousAgentStatePopup');
      this.close();
    },
    changeAgentsState() {
      this.close();
      this.$emit('changeAgentsState', this.agentsState);
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.state-change-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg) 0;
  gap: var(--spacing-sm);

  &__input {
    display: flex;
    max-width: 200px;
    gap: var(--spacing-sm);
  }
}
</style>
