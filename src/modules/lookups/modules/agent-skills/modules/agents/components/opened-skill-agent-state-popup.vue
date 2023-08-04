<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $t('objects.lookups.skills.selectCapacityAndState') }}
    </template>
    <template v-slot:main>
      <div class="state-change-content">
        <wt-input
          class="state-change-content__input"
          v-model="agentsState.capacity"
          :label="$t('objects.lookups.skills.capacity')"
          type="number"
        ></wt-input>
        <wt-switcher
          v-model="agentsState.enabled"
          :labelLeft="true"
          :label="$t('objects.lookups.skills.state')"
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
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-skill-agent-popup',
  mixins: [nestedObjectMixin],
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
  },
};
</script>

<style lang="scss" scoped>
.state-change-content {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  padding: var(--spacing-lg) 0;
  justify-content: center;
  &__input {
    max-width: 200px;
    display: flex;
    gap: var(--spacing-sm);
  }
}
</style>
