<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.agents.agents', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="agent"
          :v="$v.itemInstance.agent"
          :label="$tc('objects.ccenter.agents.agents', 1)"
          :search="loadAgentsOptions"
          :internal-search="false"
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
import { mapState } from 'vuex';
import { getAgentsList } from '../../../../agents/api/agents';
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

  computed: {
    ...mapState('ccenter/teams/agents', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
      agent: (state) => state.itemInstance.agent,
    }),
  },

  methods: {
    async loadAgentsOptions(search) {
      const response = await getAgentsList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
