<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ $t('objects.directory.users.variables') }}
      </h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addVariable"
      />
    </header>
    <div class="opened-card-input-grid">
      <div class="variables">
        <div
          v-for="(variable, key) in itemInstance.variables"
          :key="key"
          class="value-pair"
        >
          <wt-input
            :disabled="disableUserInput"
            :placeholder="$t('objects.directory.users.varKey')"
            :v="v.itemInstance.variables.$each.$response.$data[key].key"
            :value="variable.key"
            @input="setVariableProp({index: key, prop: 'key', value: $event})"
          />
          <wt-input
            :disabled="disableUserInput"
            :placeholder="$t('objects.directory.users.varVal')"
            :v="v.itemInstance.variables.$each.$response.$data[key].value"
            :value="variable.value"
            @input="setVariableProp({index: key, prop: 'value', value: $event})"
          />
          <wt-icon-action
            v-if="!disableUserInput"
            action="delete"
            class="value-pair__delete-button"
            @click="deleteVariable(key)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedUserVariables',
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>
.value-pair__delete-button {
  margin-bottom: 20px;
}
</style>
