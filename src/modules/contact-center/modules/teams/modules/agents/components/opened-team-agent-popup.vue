<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.agents.agents', 1) }}
    </template>
    <template v-slot:main>
      <form>
        <wt-select
          :value="itemInstance.agent"
          :v="$v.itemInstance.agent"
          :label="$tc('objects.ccenter.agents.agents', 1)"
          :search-method="loadAgentsOptions"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'agent', value: $event })"
        ></wt-select>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabled"
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
import { required } from 'vuelidate/lib/validators';
import AgentsAPI from '../../../../agents/api/agents';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-team-agent-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/teams/agents',
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
