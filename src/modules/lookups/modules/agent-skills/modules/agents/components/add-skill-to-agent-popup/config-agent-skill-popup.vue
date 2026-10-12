<template>
  <wt-popup
    shown
    size="sm"
    @close="emit('cancel')"
  >
    <template #title>
      {{ t('objects.lookups.skills.selectCapacityAndState') }}
    </template>
    <template #main>
      <form class="config-agent-skill-popup__form">
        <wt-input-number
          v-model:model-value="draft.capacity"
          :label="t('objects.lookups.skills.capacity')"
          :regle-validation="r$.$fields.capacity"
        />
        <wt-switcher
          v-model:model-value="draft.enabled"
          :label="t('objects.lookups.skills.state')"
          label-left
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="r$.$invalid"
        @click="emit('select', { ...draft })"
      >
        {{ t('objects.add') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="emit('back')"
      >
        {{ t('objects.back') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script lang="ts" setup>
import { useRegleSchema } from '@regle/schemas';
import { agentSkillSchema } from '@webitel/api-services/validations';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits<{
	select: [
		config: {
			capacity: number;
			enabled: boolean;
		},
	];
	back: [];
	cancel: [];
}>();

const { t } = useI18n();

const draft = ref({
	capacity: 10,
	enabled: false,
});

const { r$ } = useRegleSchema(
	draft,
	agentSkillSchema.pick({
		capacity: true,
		enabled: true,
	}),
	{
		autoDirty: true,
	},
);
</script>

<style scoped>
.config-agent-skill-popup__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
