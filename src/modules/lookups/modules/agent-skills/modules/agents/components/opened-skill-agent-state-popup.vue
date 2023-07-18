<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      Select capacity and state
    </template>
    <template v-slot:main>
      <wt-input
        v-model="agentCapacity"
        :label="$t('objects.lookups.skills.capacity')"
        type="number"
      ></wt-input>
      <wt-switcher
        v-model="agentState"
        :labelLeft="true"
        :label="'State'"
      >
      </wt-switcher>
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
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
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-skill-agent-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/teams/agents',
    agentCapacity: 1,
    agentState: true,
  }),
  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      agent: { required },
    },
  },

  methods: {
    previousAgentStatePopup() {
      this.$emit('previousAgentStatePopup');
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
