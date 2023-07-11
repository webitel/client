<template>
  <wt-popup min-width="900" overflow @close="close">
    <template v-slot:title>
      Assign skill to agents
    </template>
    <template v-slot:main>

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
 // import AgentsAPI from '../../../../agents/api/agents';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-skill-agent-popup',
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

  },
};
</script>

<style lang="scss" scoped>
</style>
