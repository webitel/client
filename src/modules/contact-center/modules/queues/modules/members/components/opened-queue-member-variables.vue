<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.ccenter.queues.variables') }}
      </h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addVariable"
      />
    </header>
    <form class="opened-card-input-grid">
      <div class="variables">
        <div
          v-for="(variable, index) in variables"
          :key="index"
          class="value-pair"
        >
          <wt-input-text
            v-model:model-value="variable.key"
            :disabled="disableUserInput"
            :placeholder="t('objects.ccenter.queues.varKey')"
          />
          <wt-input-text
            v-model:model-value="variable.value"
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
import type { EngineMemberInQueue } from '@webitel/api-services/gen/models';
import type { VariablePair } from '@webitel/api-services/validations';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<EngineMemberInQueue>({
	required: true,
});

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

/** pairs here, a map on the wire; QueueMembersAPI converts between the two */
const variables = computed<VariablePair[]>(() => {
	if (!modelValue.value.variables) {
		modelValue.value.variables =
			[] as unknown as EngineMemberInQueue['variables'];
	}
	return modelValue.value.variables as unknown as VariablePair[];
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
>
.value-pair {
  display: grid;
  align-items: center;
  margin-bottom: 20px;
  grid-template-columns: 1fr 1fr 24px;
  grid-gap: 20px;
}
</style>
