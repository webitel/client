<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.ccenter.teams.parameters') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-input-number
        v-model:model-value="modelValue.maxNoAnswer"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.teams.maxNoAnswer')"
        :regle-validation="validationFields?.maxNoAnswer"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.noAnswerDelayTime"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.teams.noAnswerDelayTime')"
        :regle-validation="validationFields?.noAnswerDelayTime"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.taskAcceptTimeout"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.teams.taskAcceptTimeout')"
        :regle-validation="validationFields?.taskAcceptTimeout"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.callTimeout"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.teams.callTimeout')"
        :regle-validation="validationFields?.callTimeout"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.inviteChatTimeout"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.teams.inviteChatTimeout')"
        :regle-validation="validationFields?.inviteChatTimeout"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.wrapUpTime"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.teams.wrapUpTime')"
        :regle-validation="validationFields?.wrapUpTime"
        required
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { EngineAgentTeam } from '@webitel/api-services/gen/models';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<EngineAgentTeam>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<EngineAgentTeam>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
</script>
