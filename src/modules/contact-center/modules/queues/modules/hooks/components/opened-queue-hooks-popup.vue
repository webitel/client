<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.queues.hooks.hooks', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          v-model="event"
          :v="$v.itemInstance.event"
          :label="$t('objects.ccenter.queues.hooks.event')"
          :options="eventOptions"
          :clearable="false"
          track-by="value"
          required
        ></wt-select>
        <wt-select
          :value="itemInstance.schema"
          :v="$v.itemInstance.schema"
          :label="$tc('objects.routing.flow.flow', 1)"
          :search="loadFlowOptions"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'schema', value: $event })"
        ></wt-select>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >{{ $t('objects.save') }}
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
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import { getFlowList } from '../../../../../../routing/modules/flow/api/flow';
import HookEvent from '../enum/HookEvent.enum';

export default {
  name: 'opened-queue-hooks-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'ccenter/queues/hooks',
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
        name: this.$t(`objects.ccenter.queues.hooks.eventTypes.${event}`),
        value: event,
      }));
    },
    event: {
      get() {
        const { event } = this.itemInstance;
        return event ? {
          name: this.$t(`objects.ccenter.queues.hooks.eventTypes.${event}`),
          value: event,
        } : {};
      },
      set(value) {
        this.setItemProp({ prop: 'event', value: value.value });
      },
    },
  },

  methods: {
    async loadFlowOptions(search) {
      const response = await getFlowList({ search });
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
