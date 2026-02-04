<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-area-grid">
      <wt-input-text :disabled="disableUserInput" :label="$t('objects.name')" :v="v.itemInstance.name"
        :model-value="itemInstance.name" required class="object-input-area-grid__name"
        @update:model-value="setItemProp({ prop: 'name', value: $event })" />
      <wt-select v-model="strategy" :clearable="false" :disabled="disableUserInput"
        :label="$t('objects.ccenter.teams.strategy')" :options="strategyOptions" :v="v.itemInstance.strategy" required
        class="object-input-area-grid__strategy" track-by="value" />
      <wt-select :close-on-select="false" :disabled="disableUserInput" :label="$t('objects.ccenter.agents.admins', 1)"
        :search-method="fetchAdmins" :value="itemInstance.admin" multiple class="object-input-area-grid__admins"
        @input="setItemProp({ prop: 'admin', value: $event })" />
      <wt-textarea :disabled="disableUserInput" :label="$t('objects.description')"
        :model-value="itemInstance.description" class="object-input-area-grid__description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })" />
      <wt-switcher :disabled="disableUserInput" :label="$t('objects.ccenter.agents.agentScreenControl')"
        :model-value="itemInstance.screenControl" class="object-input-area-grid__screen-control"
        @update:model-value="setItemProp({ prop: 'screenControl', value: $event })" />
    </div>
  </section>
</template>

<script>
import { kebabToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';

import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import AgentsAPI from '../../agents/api/agents';
import TeamStrategy from '../store/_internals/enums/TeamStrategy.enum';

export default {
  name: 'OpenedTeamGeneral',
  mixins: [openedTabComponentMixin],

  computed: {
    strategy: {
      get() {
        return this.strategyOptions.find(
          (strategy) => strategy.value === this.itemInstance.strategy,
        );
      },
      set(value) {
        this.setItemProp({
          prop: 'strategy',
          value: value.value,
        });
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
    fetchAdmins(params) {
      return AgentsAPI.getList(params);
    },
  },
};
</script>

<style lang="scss" scoped>
.object-input-area-grid {
  grid-template-areas:
    'name strategy'
    'admins description'
    '. screenControl';
  ;

  &__name {
    grid-area: name;
  }

  &__strategy {
    grid-area: strategy;
  }

  &__admins {
    grid-area: admins;
  }

  &__description {
    grid-area: description;
  }

  &__screen-control {
    grid-area: screenControl;
    align-self: center;
  }
}
</style>
