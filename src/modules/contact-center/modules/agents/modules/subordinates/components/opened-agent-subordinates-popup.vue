<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $t('objects.ccenter.agents.addSubordinate') }}
    </template>
    <template v-slot:main>
      <form>
        <wt-select
          :value="itemInstance.agent"
          :v="$v.itemInstance.agent"
          :label="$tc('objects.ccenter.agents.subordinates', 1)"
          :search-method="loadDropdownOptionsList"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'agent', value: $event })"
        ></wt-select>
      </form>
    </template>
    <template slot="actions">
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
import { required } from 'vuelidate/lib/validators';
import AgentsAPI from '../../../api/agents';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

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

  methods: {
    async loadDropdownOptionsList(params) {
      const fields = ['id', 'name', 'supervisor'];
      const response = await AgentsAPI.getRegularAgentsOptions({ ...params, fields });
      response.items = response.items.map((item) => ({
        ...item,
        supervisor: item.supervisor || [],
      }));
      return response;
    },
  },
};
</script>

<style scoped>

</style>
