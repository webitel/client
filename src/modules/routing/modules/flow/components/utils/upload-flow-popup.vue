<template>
  <wt-popup
    :shown="!!file"
    size="sm"
    overflow
    @close="close"
  >
    <template #title>
      {{ t('objects.importJSON') }}
    </template>
    <template #main>
      <form>
        <wt-checkbox
          v-model:selected="create"
          :label="t('objects.routing.flow.createNew')"
        />
        <wt-input-text
          v-model:model-value="flow.name"
          :label="t('objects.name')"
          :regle-validation="r$.$fields.name"
          required
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="r$.$invalid"
        @click="save"
      >
        {{ t('objects.add') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { useRegleSchema } from '@regle/schemas';
import { FlowsAPI } from '@webitel/api-services/api';
import { flowSchema } from '@webitel/api-services/validations';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
	file: {
		required: true,
	},
});

const emit = defineEmits([
	'close',
]);

const { t } = useI18n();

const create = ref(true);
const flow = ref({
	name: '',
});

const { r$ } = useRegleSchema(
	flow,
	flowSchema.pick({
		name: true,
	}),
	{
		autoDirty: true,
	},
);

const close = () => emit('close');

const save = async () => {
	if (create.value) {
		await FlowsAPI.add({
			itemInstance: {
				...flow.value,
				id: undefined,
			},
		});
	} else {
		await FlowsAPI.update({
			itemId: flow.value.id,
			itemInstance: flow.value,
		});
	}
	close();
};

watch(
	() => props.file,
	async (file) => {
		if (!file) return;
		flow.value = JSON.parse(await file.text());
		r$.$touch();
	},
);
</script>
