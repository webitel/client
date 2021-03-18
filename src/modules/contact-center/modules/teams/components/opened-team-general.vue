<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        v-model="strategy"
        :v="v.itemInstance.strategy"
        :label="$t('objects.ccenter.teams.strategy')"
        :options="strategyOptions"
        :clearable="false"
        :disabled="disableUserInput"
        track-by="value"
        required
      ></wt-select>
      <wt-select
        :value="itemInstance.admin"
        :label="$tc('objects.ccenter.agents.admins', 1)"
        :search="fetchAdmins"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'admin', value: $event })"
      ></wt-select>
      <wt-textarea
        :value="itemInstance.description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </form>
  </section>
</template>

<script>
import { kebabToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import { getAgentSupervisorsOptions } from '../../agents/api/agents';
import TeamStrategy from '../store/_internals/enums/TeamStrategy.enum';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-team-general',
  mixins: [openedTabComponentMixin],

  computed: {
    strategy: {
      get() {
        return this.strategyOptions
          .find((strategy) => strategy.value === this.itemInstance.strategy);
      },
      set(value) {
        this.setItemProp({ prop: 'strategy', value: value.value });
      },
    },
    strategyOptions() {
      return Object.values(TeamStrategy).map((strategy) => ({
        name: this.$t(`objects.ccenter.teams.strategies.${kebabToCamel(strategy)}`),
        value: strategy,
      }));
    },
  },
  methods: {
    async fetchAdmins(search) {
      const fields = ['id', 'name'];
      const response = await getAgentSupervisorsOptions({ search, fields });
      return response.list.map((item) => ({ name: item.name, id: item.id }));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
