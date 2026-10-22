<template>
  <wt-popup
    :shown="shown"
    size="sm"
    overflow
    @close="close"
  >
    <template #title>
      {{ t('objects.lookups.skills.changeAgentsSkill') }}
    </template>
    <template #main>
      <div class="replace-agent-skill-popup__skill">
        <wt-single-select
          v-model:model-value="draft.skill"
          :show-clear="false"
          :label="t('objects.lookups.skills.changeSkillTo')"
          :search-method="SkillsAPI.getLookup"
          :regle-validation="r$.$fields.skill"
          required
        />
      </div>
      <wt-switcher
        v-model:model-value="draft.enabled"
        :label="t('objects.lookups.skills.state')"
        label-left
      />
    </template>
    <template #actions>
      <wt-button
        :disabled="r$.$invalid"
        @click="change"
      >
        {{ t('objects.change') }}
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

<script lang="ts" setup>
import { useRegleSchema } from '@regle/schemas';
import { SkillsAPI } from '@webitel/api-services/api';
import type { EngineLookup } from '@webitel/api-services/gen/models';
import { agentSkillSchema } from '@webitel/api-services/validations';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

defineProps<{
	shown: boolean;
}>();

const emit = defineEmits<{
	close: [];
	change: [
		changes: {
			skill: EngineLookup;
			enabled: boolean;
		},
	];
}>();

const { t } = useI18n();

const draft = ref({
	skill: {} as EngineLookup,
	enabled: false,
});

const { r$ } = useRegleSchema(
	draft,
	agentSkillSchema.pick({
		skill: true,
		enabled: true,
	}),
	{
		autoDirty: true,
	},
);

const close = () => emit('close');

const change = () => {
	emit('change', {
		...draft.value,
	});
	close();
};
</script>

<style scoped>
.replace-agent-skill-popup__skill {
  margin-bottom: var(--spacing-sm);
}
</style>
