<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $t('objects.ccenter.agents.addSubordinate') }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="agent"
          :v="$v.itemInstance.agent"
          :label="$tc('objects.ccenter.agents.subordinates', 1)"
          :search="loadDropdownOptionsList"
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
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { getAgentsList } from '../../api/agents';
import nestedObjectMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-agent-subordinates-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/agents/subordinates',
  }),

  validations: {
    itemInstance: {
      agent: { required },
    },
  },

  computed: {
    ...mapState('ccenter/agents/subordinates', {
      id: (state) => state.itemId,
      parentId: (state) => state.parentId,
      itemInstance: (state) => state.itemInstance,
      agent: (state) => state.itemInstance.agent,
    }),
  },

  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getAgentsList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style scoped>

</style>
