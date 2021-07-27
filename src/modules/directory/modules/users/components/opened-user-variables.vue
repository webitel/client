<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.directory.users.variables') }}</h3>
      <wt-icon-btn
        v-if="!disableUserInput"
        class="icon-action"
        icon="plus"
        :tooltip="$t('iconHints.add')"
        @click="addVariable"
      ></wt-icon-btn>
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
            :v="v.itemInstance.variables.$each[key].key"
            :placeholder="$t('objects.directory.users.varKey')"
            :disabled="disableUserInput"
            @input="setVariableProp({index: key, prop: 'key', value: $event})"
          ></wt-input>
          <wt-input
            :value="variable.value"
            :v="v.itemInstance.variables.$each[key].value"
            :placeholder="$t('objects.directory.users.varVal')"
            :disabled="disableUserInput"
            @input="setVariableProp({index: key, prop: 'value', value: $event})"
          ></wt-input>
          <wt-icon-btn
            class="value-pair__delete-button"
            v-if="!disableUserInput"
            icon="bucket"
            :tooltip="$t('iconHints.delete')"
            @click="deleteVariable(key)"
          ></wt-icon-btn>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-user-variables',
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>
.value-pair__delete-button{
  margin-bottom: 20px;
}
</style>
