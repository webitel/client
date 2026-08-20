<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ t('objects.ccenter.queues.variables') }}
      </h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addVariable"
      />
    </header>
    <form class="object-input-grid">
      <div class="variables">
        <div
          v-for="(variable, index) in variables"
          :key="index"
          class="value-pair"
        >
          <wt-input-text
            v-model="variable.key"
            :disabled="disableUserInput"
            :placeholder="t('objects.ccenter.queues.varKey')"
          />
          <wt-input-text
            v-model="variable.value"
            :disabled="disableUserInput"
            :placeholder="t('objects.ccenter.queues.varVal')"
          />
          <wt-icon-action
            v-if="!disableUserInput"
            action="delete"
            @click="deleteVariable(index)"
          />
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import type { Queue, QueueVariablePair } from '../../../types/Queue';

const modelValue = defineModel<Queue>({
	required: true,
});

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const variables = computed<QueueVariablePair[]>(() => {
	if (!modelValue.value.variables) modelValue.value.variables = [];
	return modelValue.value.variables;
});

const addVariable = () => {
	variables.value.push({
		key: '',
		value: '',
	});
};

const deleteVariable = (index: number) => {
	variables.value.splice(index, 1);
};
</script>

<style
  lang="scss"
  scoped
></style>
