<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      Select capacity and state
    </template>
    <template v-slot:main>
      <wt-input
        v-model="agentsState.capacity"
        :label="$t('objects.lookups.skills.capacity')"
        type="number"
      ></wt-input>
      <wt-switcher
        v-model="agentsState.state"
        :labelLeft="true"
        :label="'State'"
      >
      </wt-switcher>
    </template>
    <template v-slot:actions>
      <wt-button
        @click="changeAgentsState"
      >{{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="previousAgentStatePopup"
      ><!--TODO: write locales for this button-->
        {{ 'Back' }}
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
    namespace: 'ccenter/teams/agents',
    agentCapacity: 1,
    agentState: true,
    agentsState: {
      capacity: 1,
      enabled: true,
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
</style>
