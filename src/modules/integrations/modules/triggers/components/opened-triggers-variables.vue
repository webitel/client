<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('vocabulary.variables', 2) }}</h3>
      <add-action
        v-if="!disableUserInput"
        @click="addVariable"
      ></add-action>
    </header>
    <form class="object-input-grid">
      <div class="variables">
        <div
          v-for="(variable, key) in itemInstance.variables"
          :key="key"
          class="value-pair"
        >
          <wt-input
            :disabled="disableUserInput"
            :placeholder="$t('objects.ccenter.queues.varKey')"
            :value="variable.key"
            @input="setVariableProp({index: key, prop: 'key', value: $event})"
          ></wt-input>
          <wt-input
            :disabled="disableUserInput"
            :placeholder="$t('objects.ccenter.queues.varVal')"
            :value="variable.value"
            @input="setVariableProp({index: key, prop: 'value', value: $event})"
          ></wt-input>
          <delete-action
            v-if="!disableUserInput"
            @click="deleteVariable(key)"
          ></delete-action>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-triggers-variables',
  components: {},

  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>
</style>
