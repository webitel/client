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
        <wt-input
          :label="$t('objects.title')"
          :v="v$.itemInstance.name"
          :value="itemInstance.name"
          required
          @input="setItemProp({ prop: 'name', value: $event })"
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
import { EngineRoutingSchemaType } from "webitel-sdk";
import nestedObjectMixin from "../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin";
import FlowsAPI from "../../../../../../routing/modules/flow/api/flow";

export default {
	name: "OpenedTeamFlowPopup",
	mixins: [nestedObjectMixin],

	setup: () => ({
		v$: useVuelidate(),
	}),
	data: () => ({
		namespace: "ccenter/teams/flow",
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
				? this.$tc("objects.ccenter.teams.flows.editFlowSchema")
				: this.$tc("objects.ccenter.teams.flows.addFlowSchema");
		},
	},

	methods: {
		loadFlowOptions(params) {
			return FlowsAPI.getLookup({
				...params,
				type: [EngineRoutingSchemaType.Service],
			});
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
