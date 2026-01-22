<template>
  <wt-popup v-bind="$attrs" :shown="!!flowId" size="sm" overflow @close="close">
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form>
        <wt-input :label="$t('objects.title')" :v="v$.itemInstance.name" :value="itemInstance.name" required
          @input="setItemProp({ prop: 'name', value: $event })" />
        <wt-select :clearable="false" :label="$t('objects.routing.flow.flow', 1)" :search-method="loadFlowOptions"
          :v="v$.itemInstance.schema" :value="itemInstance.schema" required
          @input="setItemProp({ prop: 'schema', value: $event })" />
      </form>
    </template>
    <template #actions>
      <wt-button :disabled="disabledSave" @click="save">
        {{ $t('objects.save') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { EngineRoutingSchemaType } from 'webitel-sdk';

import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import FlowsAPI from '../../../../../../routing/modules/flow/api/flow';

export default {
  name: 'OpenedTeamFlowPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({ $stopPropagation: true }),
  }),
  data: () => ({
    namespace: 'ccenter/teams/flow',
  }),
  validations: {
    itemInstance: {
      name: { required },
      schema: { required },
    },
  },
  computed: {
    popupTitle() {
      return this.itemInstance.id
        ? this.$t('objects.ccenter.teams.flows.editFlowSchema')
        : this.$t('objects.ccenter.teams.flows.addFlowSchema');
    },
    flowId() {
      return this.$route.params.flowId;
    },
  },
  watch: {
    flowId: {
      handler(id) {
        if (id === 'new') this.resetState()
        else {
          this.setId(id);
          this.loadItem();
        }
      }, immediate: true,
    }
  },

  methods: {
    loadFlowOptions(params) {
      return FlowsAPI.getLookup({
        ...params,
        type: [EngineRoutingSchemaType.Service],
      });
    },
  }
};
</script>

<style lang="scss" scoped></style>
