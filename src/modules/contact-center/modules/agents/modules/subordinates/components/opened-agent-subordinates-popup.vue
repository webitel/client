<template>
  <wt-popup
    v-bind="$attrs"
    size="sm"
    :shown="!!subordinateId"
    overflow
    @close="close"
  >
    <template #title>
      {{ $t('objects.ccenter.agents.addSubordinate') }}
    </template>
    <template #main>
      <form>
        <wt-select
          :clearable="false"
          :label="$tc('objects.ccenter.agents.subordinates', 1)"
          :search-method="loadDropdownOptionsList"
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
import AgentsAPI from '../../../api/agents';

export default {
  name: 'OpenedAgentSubordinatesPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'ccenter/agents/subordinates',
  }),
  validations: {
    itemInstance: {
      agent: { required },
    },
  },

  computed: {
    subordinateId() {
      return this.$route.params.subordinateId;
    },
  },

  methods: {
    async loadDropdownOptionsList(params) {
      const fields = ['id', 'name', 'supervisor'];
      const response = await AgentsAPI.getRegularAgentsOptions({
        ...params,
        fields,
      });
      response.items = response.items.map((item) => ({
        ...item,
        supervisor: item.supervisor || [],
      }));
      return response;
    },
  },
  watch: {
    subordinateId: {
      handler(id) {
        this.handleIdChange(id);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
