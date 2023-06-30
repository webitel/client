<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.variables') }}</h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addVariable"
      ></wt-icon-action>
    </header>
    <form class="object-input-grid">
      <div class="variables">
        <div
          class="value-pair"
          v-for="(variable, key) in itemInstance.variables"
          :key="key"
        >
          <wt-input
            :value="variable.key"
            :placeholder="$t('objects.ccenter.queues.varKey')"
            :disabled="disableUserInput"
            @input="setVariableProp({index: key, prop: 'key', value: $event})"
          ></wt-input>
          <wt-input
            :value="variable.value"
            :placeholder="$t('objects.ccenter.queues.varVal')"
            :disabled="disableUserInput"
            @input="setVariableProp({index: key, prop: 'value', value: $event})"
          ></wt-input>
          <wt-icon-action
            v-if="!disableUserInput"
            action="delete"
            class="table-action"
            @click="deleteVariable(key)"
          ></wt-icon-action>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-member-variables',
  mixins: [openedTabComponentMixin],
  computed: {
    disableUserInput() {
      return !this.hasEditAccess;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
