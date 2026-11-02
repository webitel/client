<template>
  <div class="copy-input">
    <wt-input-text
      v-model:model-value="model"
      v-bind="$attrs"
    >
      <template #suffix>
        <wt-copy-action :value="copyValue" />
      </template>
    </wt-input-text>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/** [Claude] used with v-model, which the compat build would turn into `value`/`input` that `defineModel` never reads */
defineOptions({
	inheritAttrs: false,
	compatConfig: {
		COMPONENT_V_MODEL: false,
	},
});

const model = defineModel<string>({
	default: '',
});

const props = defineProps<{
	/** [Claude] what gets copied, when it differs from the shown value (e.g. a full url for a path) */
	copyModifier?: (value: string) => string;
}>();

const copyValue = computed(() =>
	props.copyModifier ? props.copyModifier(model.value) : model.value,
);
</script>

<style scoped>
.copy-input {
  z-index: 1;
}
</style>
