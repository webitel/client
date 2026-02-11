<template>
  <wt-popup
    v-bind="$attrs"
    size="sm"
    @close="emit('cancel')"
  >
    <template #title>
      {{ $t('objects.lookups.skills.selectCapacityAndState') }}
    </template>
    <template #main>
      <form class="config-agent-skill-popup-form">
        <wt-input-number
          v-model:model-value="state.capacity"
          :label="$t('objects.lookups.skills.capacity')"
        />
        <!-- temporary usage v-model:model-value instead of v-model because of vue 2 compat -->
        <wt-switcher
          v-model:model-value="state.enabled"
          :label="$t('objects.lookups.skills.state')"
          label-left
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="v$.$error"
        @click="emit('select', state)"
      >
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="emit('back')"
      >
        {{ $t('objects.back') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxValue, minValue } from '@vuelidate/validators';
import { computed, onMounted, reactive } from 'vue';

const emit = defineEmits([
	'select',
	'back',
	'cancel',
]);

const state = reactive({
	capacity: 10,
	enabled: false,
});

const rules = computed(() => ({
	capacity: {
		minValue: minValue(0),
		maxValue: maxValue(100),
	},
}));

const v$ = useVuelidate(rules, state, {
	$autoDirty: true,
});

onMounted(() => v$.value.$touch());
</script>

<style lang="scss" scoped>
.config-agent-skill-popup-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
