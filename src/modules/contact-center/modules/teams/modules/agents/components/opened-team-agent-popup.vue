<template>
  <wt-popup
    min-width="480"
    overflow
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form>
        <wt-select
          :clearable="false"
          :label="$tc('objects.ccenter.agents.agents', 1)"
          :search-method="loadAgentsOptions"
          :v="v$.itemInstance.agent"
          :value="itemInstance.agent"
          required
          @input="setItemProp({ prop: 'agent', value: $event })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
      >
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
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
  name: 'OpenedTeamAgentPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),

  data: () => ({
    namespace: 'ccenter/teams/agents',
  }),
  validations: {
    itemInstance: {
      agent: { required },
    },
  },
  computed: {
    popupTitle() {
      return this.id
        ? this.$t('objects.ccenter.teams.agents.editAgent')
        : this.$t('objects.ccenter.teams.agents.addAgent');
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
