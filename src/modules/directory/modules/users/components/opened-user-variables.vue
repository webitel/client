<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.directory.users.variables') }}
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
            :placeholder="t('objects.directory.users.varKey')"
            :v="v.itemInstance.variables.$each.$response.$data[key].key"
            :value="variable.key"
            @input="setItemProp({path: `variables[${key}].key`, value: $event})"
          />
          <wt-input
            :disabled="disableUserInput"
            :placeholder="t('objects.directory.users.varVal')"
            :v="v.itemInstance.variables.$each.$response.$data[key].value"
            :value="variable.value"
            @input="setItemProp({path: `variables[${key}].value`, value: $event})"
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

<script setup>
import { useCardStore } from '@webitel/ui-sdk/src/store/new/index.js';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useAccessControl } from '@webitel/ui-sdk/src/composables/useAccessControl/useAccessControl.js';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
  v: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const { t } = useI18n();

const { disableUserInput } = useAccessControl();

const { itemInstance, setItemProp } = useCardStore(props.namespace);

const addVariable = () => {
  const value = [...itemInstance.value.variables, { key: '', value: '' }];
  return setItemProp({ path: 'variables', value });
};
const deleteVariable = (index) => {
  const value = itemInstance.value.variables.filter((_, i) => i !== index);
  return setItemProp({ path: 'variables', value });
};
</script>

<style lang="scss" scoped>
.value-pair__delete-button {
  margin-bottom: 20px;
}
</style>
