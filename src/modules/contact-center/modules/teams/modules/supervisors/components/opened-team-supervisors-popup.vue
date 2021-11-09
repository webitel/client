<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.agents.supervisors', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="itemInstance.agent"
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
import getNamespacedState from '../../../../../../../app/store/helpers/getNamespacedState';
import { getSupervisorOptions } from '../../../../agents/api/agents';

import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-team-agents-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/teams/supervisors',
  }),

  validations: {
    itemInstance: {
      agent: { required },
    },
  },

  computed: {
    ...mapState({
      parentId(state) {
        return getNamespacedState(state, 'ccenter/teams').itemId;
      },
    }),
  },

  methods: {
    async loadAgentsOptions(search) {
      const response = await getSupervisorOptions({
        search,
        notTeamId: this.parentId,
      });
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
