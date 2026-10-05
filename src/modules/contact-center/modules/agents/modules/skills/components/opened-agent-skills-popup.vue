<template>
  <wt-popup
    :shown="!!skillId"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form
        class="opened-agent-skills-popup__form"
        @submit.prevent="save"
      >
        <wt-single-select
          v-model:model-value="modelValue.skill"
          :disabled="!hasSkillsReadAccess"
          :label="t('objects.lookups.skills.skills', 1)"
          :regle-validation="validationFields?.skill"
          :search-method="SkillsAPI.getLookup"
          :show-clear="false"
          required
        />
        <wt-input-number
          v-model:model-value="modelValue.capacity"
          :label="t('objects.lookups.skills.capacity')"
          :regle-validation="validationFields?.capacity"
          required
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="hasValidationErrors"
        @click="save"
      >
        {{ isNew ? t('objects.add') : t('objects.save') }}
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
import { SkillsAPI } from '@webitel/api-services/api';
import type { EngineAgentSkill } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor, WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import AgentsRouteNames from '../../../router/_internals/AgentsRouteNames.enum';
import { useAgentSkillsCardStore } from '../stores/card/agentSkillsCardStore';

const props = defineProps<{
	parentId: string | number | null;
}>();

const emit = defineEmits<{
	saved: [];
}>();

const { t } = useI18n();
const route = useRoute();

const { hasReadAccess: hasSkillsReadAccess } = useUserAccessControl(
	WtObject.Skill,
);

const {
	modelValue,
	validationFields,
	isNew,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<EngineAgentSkill>({
	useCardStore: useAgentSkillsCardStore,
	routeParamName: 'skillId',
	parentId: () => props.parentId,
});

const skillId = computed(() => route.params.skillId);

const popupTitle = computed(() =>
	isNew.value
		? t('objects.ccenter.agents.addSkill')
		: t('objects.ccenter.agents.editSkill'),
);

const { close } = useClose(AgentsRouteNames.SKILLS);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};
</script>

<style scoped>
.opened-agent-skills-popup__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
