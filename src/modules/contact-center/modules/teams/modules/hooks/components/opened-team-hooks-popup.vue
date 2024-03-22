<template>
  <wt-popup
    min-width="480"
    overflow
    @close="close"
  >
    <template #title>
<!--      {{ $tc('objects.ccenter.queues.hooks.hooks', 1) }}-->
    </template>
    <template #main>
      <form>
        <wt-select
          v-model="event"
          :clearable="false"
          :label="$t('objects.ccenter.queues.hooks.event')"
          :options="eventOptions"
          :v="v$.itemInstance.event"
          required
          track-by="value"
        />
        <wt-select
          :clearable="false"
          :label="$tc('objects.routing.flow.flow', 1)"
          :search-method="loadFlowOptions"
          :v="v$.itemInstance.schema"
          :value="itemInstance.schema"
          required
          @input="setItemProp({ prop: 'schema', value: $event })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
      >
        {{ $t('objects.save') }}
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
import { EngineRoutingSchemaType } from 'webitel-sdk';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import FlowsAPI from '../../../../../../routing/modules/flow/api/flow';
import HookEvent from '../enum/HookEvent.enum';

export default {
  name: 'OpenedQueueHooksPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'ccenter/teams/hooks',
  }),
  validations: {
    itemInstance: {
      event: { required },
      schema: { required },
    },
  },

  computed: {
    eventOptions() {
      return Object.values(HookEvent).map((event) => ({
        // name: this.$t(`objects.ccenter.queues.hooks.eventTypes.${event}`),
        value: event,
      }));
    },
    event: {
      get() {
        const { event } = this.itemInstance;
        return event ? {
          // name: this.$t(`objects.ccenter.queues.hooks.eventTypes.${event}`),
          value: event,
        } : {};
      },
      set(value) {
        this.setItemProp({ prop: 'event', value: value.value });
      },
    },
  },

  methods: {
    loadFlowOptions(params) {
      return FlowsAPI.getLookup({ ...params, type: [EngineRoutingSchemaType.Service] });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
