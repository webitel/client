<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('vocabulary.variables', 2) }}
      </h3>
      <wt-icon-action v-if="!disableUserInput" action="add" @click="addVariable" />
    </header>
    <form class="object-input-grid">
      <div class="variables">
        <div v-for="(variable, key) in itemInstance.variables" :key="key" class="value-pair">
          <wt-input-text :disabled="disableUserInput" :placeholder="$t('vocabulary.keys', 1)" :model-value="variable.key"
            @update:model-value="setVariableProp({ index: key, prop: 'key', value: $event })" />
          <wt-input-text :disabled="disableUserInput" :placeholder="$t('vocabulary.values', 1)" :model-value="variable.value"
            @update:model-value="setVariableProp({ index: key, prop: 'value', value: $event })" />
          <wt-icon-action v-if="!disableUserInput" action="delete" @click="deleteVariable(key)" />
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedTriggerVariables',
  components: {},

  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped></style>
