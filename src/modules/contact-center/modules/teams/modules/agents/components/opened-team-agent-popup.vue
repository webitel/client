<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $tc('objects.ccenter.agents.agents', 1) }}
    </template>
    <template v-slot:main>
      <form>
        <wt-select
          :clearable="false"
          :label="$tc('objects.ccenter.agents.agents', 1)"
          :search-method="loadAgentsOptions"
          :v="v$.itemInstance.agent"
          :value="itemInstance.agent"
          required
          @input="setItemProp({ prop: 'agent', value: $event })"
        ></wt-select>
      </form>
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
      >{{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import AgentsAPI from '../../../../agents/api/agents';

export default {
  name: 'opened-team-agent-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/teams/agents',
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
    loadAgentsOptions(params) {
      return AgentsAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
