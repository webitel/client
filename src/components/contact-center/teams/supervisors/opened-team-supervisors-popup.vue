<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.agents.supervisors', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="user"
          :v="$v.itemInstance.user"
          :label="$tc('objects.ccenter.agents.agents', 1)"
          :search="loadAgentsOptions"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'user', value: $event })"
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
import { getAgentsList } from '../../../../api/contact-center/agents/agents';
import nestedObjectMixin from '../../../../mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-team-agents-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/teams/supervisors',
  }),

  validations: {
    itemInstance: {
      user: { required },
    },
  },

  computed: {
    ...mapState('ccenter/teams/supervisors', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
      user: (state) => state.itemInstance.user,
    }),
  },

  methods: {
    async loadAgentsOptions(search) {
      const response = await getAgentsList({ search });
      return response.list.map((item) => ({
        name: item.user.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
