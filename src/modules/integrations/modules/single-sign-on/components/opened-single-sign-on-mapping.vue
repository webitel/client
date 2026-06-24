<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.integrations.singleSignOn.mapping') }}
      </h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addPair"
      />
    </header>

    <form class="object-input-grid">
      <div class="sso-mapping">
        <div
          v-for="(pair, index) in mappingPairs"
          :key="index"
          class="sso-mapping__row"
        >
          <wt-input-text
            :disabled="disableUserInput"
            :model-value="pair.key"
            :placeholder="$t('objects.integrations.singleSignOn.mappingKeyHint')"
            @update:model-value="updatePair(index, 'key', $event)"
          />
          <wt-input-text
            :disabled="disableUserInput"
            :model-value="pair.value"
            :placeholder="$t('objects.integrations.singleSignOn.mappingValueHint')"
            @update:model-value="updatePair(index, 'value', $event)"
          />
          <wt-icon-action
            v-if="!disableUserInput"
            action="delete"
            @click="removePair(index)"
          />
        </div>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import type { ApiOAuthService } from '@webitel/api-services/gen/models';
import { computed, watch } from 'vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
type MappingPair = {
	key: string;
	value: string;
};

const modelValue = defineModel<ApiOAuthService>({
	required: true,
});

const { disableUserInput } = useUserAccessControl();

const mappingPairs = computed<MappingPair[]>(() => {
	if (!Array.isArray(modelValue.value.mapping)) return [];
	return modelValue.value.mapping as MappingPair[];
});

const addPair = () => {
	const mapping = [
		...mappingPairs.value,
		{
			key: '',
			value: '',
		},
	];
	modelValue.value.mapping = mapping;
};

const removePair = (index: number) => {
	const mapping = mappingPairs.value.filter((_, i) => i !== index);
	modelValue.value.mapping = mapping;
};

const updatePair = (index: number, field: keyof MappingPair, value: string) => {
	const mapping = mappingPairs.value.map((pair, i) =>
		i === index
			? {
					...pair,
					[field]: value,
				}
			: pair,
	);
	modelValue.value.mapping = mapping;
};

let stopInitializeMapping: (() => void) | null = null;

stopInitializeMapping = watch(
	modelValue,
	(currentValue) => {
		if (!currentValue) return;
		if (!Array.isArray(currentValue.mapping) || !currentValue.mapping.length) {
			currentValue.mapping = [
				{
					key: '',
					value: '',
				},
			];
		}
		stopInitializeMapping?.();
		stopInitializeMapping = null;
	},
	{
		immediate: true,
	},
);
</script>

<style scoped>
.sso-mapping {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.sso-mapping__row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  gap: var(--spacing-sm);
}
</style>
