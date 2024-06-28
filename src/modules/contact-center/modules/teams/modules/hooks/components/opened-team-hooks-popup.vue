<template>
  <wt-popup
    min-width="480"
    overflow
    @close="close"
  >
    <template #title>
      {{ $tc('objects.ccenter.queues.hooks.hooks', 1) }}
    </template>
    <template #main>
      <form>
        <wt-select
          :value="event"
          :clearable="false"
          :label="$t('objects.ccenter.queues.hooks.event')"
          :options="eventOptions"
          :v="v$.itemInstance.event"
          required
          track-by="value"
          @input="setItemProp({ prop: 'event', value: $event.value })"
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
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { snakeToCamel } from "@webitel/ui-sdk/src/scripts/caseConverters";
import { EngineRoutingSchemaType } from "webitel-sdk";
import nestedObjectMixin from "../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin";
import FlowsAPI from "../../../../../../routing/modules/flow/api/flow";
import HookEvent from "../enum/HookTeamEvent.enum";

export default {
  name: "OpenedTeamHooksPopup",
  mixins: [nestedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: "ccenter/teams/hooks",
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
        name: this.$t(`objects.ccenter.teams.hooks.eventTypes.${this.snakeToCamel(event)}`),
        value: event,
      }));
    },
    event() {
      const { event } = this.itemInstance;
      return event
        ? {
            name: this.$t(`objects.ccenter.teams.hooks.eventTypes.${this.snakeToCamel(event)}`),
            value: event,
          }
        : {};
    },
  },

  methods: {
    loadFlowOptions(params) {
      return FlowsAPI.getLookup({
        ...params,
        type: [EngineRoutingSchemaType.Service],
      });
    },
    snakeToCamel,
  },
};
</script>

<style lang="scss" scoped>

</style>
