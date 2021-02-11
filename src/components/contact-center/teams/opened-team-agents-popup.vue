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
        <wt-input
          :value="lvl"
          :v="$v.itemInstance.lvl"
          :label="$t('objects.ccenter.teams.lvl')"
          type="number"
          required
          @input="setItemProp({ prop: 'lvl', value: +$event })"
        ></wt-input>
        <wt-select
          :value="buckets"
          :label="$tc('objects.ccenter.buckets.buckets', 1)"
          :search="loadBucketsOptions"
          :internal-search="false"
          :close-on-select="false"
          multiple
          @input="setItemProp({ prop: 'buckets', value: $event })"
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
import { getAgentsList } from '../../../api/contact-center/agents/agents';
import { getBucketsList } from '../../../api/contact-center/buckets/buckets';
import nestedObjectMixin from '../../../mixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-team-agents-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/teams/agents',
  }),

  validations: {
    itemInstance: {
      agent: { required },
      lvl: { required },
    },
  },

  computed: {
    ...mapState('ccenter/teams/agents', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
      agent: (state) => state.itemInstance.agent,
      lvl: (state) => state.itemInstance.lvl,
      buckets: (state) => state.itemInstance.buckets,
    }),
  },

  methods: {
    async loadAgentsOptions(search) {
      const response = await getAgentsList(1, 10, search);
      return response.list.map((item) => ({
        name: item.user.name,
        id: item.id,
      }));
    },

    async loadBucketsOptions(search) {
      const response = await getBucketsList(1, 10, search);
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
