<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-select
        v-model="strategy"
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.strategy')"
        :options="strategyOptions"
        :v="v.itemInstance.strategy"
        required
        track-by="value"
      />
      <wt-select
        :close-on-select="false"
        :disabled="disableUserInput"
        :label="$tc('objects.ccenter.agents.admins', 1)"
        :search-method="fetchAdmins"
        :value="itemInstance.admin"
        multiple
        @input="setItemProp({ prop: 'admin', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { kebabToCamel } from "@webitel/ui-sdk/src/scripts/caseConverters";
import openedTabComponentMixin from "../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin";
import AgentsAPI from "../../agents/api/agents";
import TeamStrategy from "../store/_internals/enums/TeamStrategy.enum";

export default {
	name: "OpenedTeamGeneral",
	mixins: [openedTabComponentMixin],

	computed: {
		strategy: {
			get() {
				return this.strategyOptions.find(
					(strategy) => strategy.value === this.itemInstance.strategy,
				);
			},
			set(value) {
				this.setItemProp({ prop: "strategy", value: value.value });
			},
		},
		strategyOptions() {
			return Object.values(TeamStrategy).map((strategy) => ({
				name: this.$t(
					`objects.ccenter.teams.strategies.${kebabToCamel(strategy)}`,
				),
				value: strategy,
			}));
		},
	},
	methods: {
		fetchAdmins(params) {
			return AgentsAPI.getSupervisorOptions(params);
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
