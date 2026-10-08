<template>
  <section class="opened-agent-general">
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>

    <div class="opened-card-input-grid">
      <wt-single-select
        :show-clear="false"
        :disabled="disableUserInput || !hasUserReadAccess"
        :label="t('objects.user')"
        :search-method="AgentsAPI.getAgentUsersOptions"
        v-model:model-value="modelValue.user"
        :regle-validation="validationFields?.user"
        required
      />
      <wt-single-select
        :disabled="disableUserInput || !hasMediaReadAccess"
        :label="t('objects.lookups.media.mediaFiles', 1)"
        :search-method="MediaAPI.getLookup"
        v-model:model-value="modelValue.greetingMedia"
      />
      <wt-single-select
        :disabled="disableUserInput || !hasTeamReadAccess"
        :label="t('objects.team')"
        :search-method="TeamsAPI.getLookup"
        v-model:model-value="modelValue.team"
        :regle-validation="validationFields?.team"
        required
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="t('objects.queue.progressiveCount')"
        v-model:model-value="modelValue.progressiveCount"
        :regle-validation="validationFields?.progressiveCount"
      />
      <wt-single-select
        :disabled="disableUserInput || !hasRegionReadAccess"
        :label="t('objects.region')"
        :search-method="RegionsAPI.getLookup"
        v-model:model-value="modelValue.region"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="t('objects.ccenter.agents.chatCount')"
        v-model:model-value="modelValue.chatCount"
        :regle-validation="validationFields?.chatCount"
        required
      />
      <wt-multi-select
        :disabled="disableUserInput || !hasAuditorReadAccess"
        :label="t('objects.auditor')"
        :search-method="UsersAPI.getLookup"
        v-model:model-value="modelValue.auditor"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="t('objects.ccenter.agents.extraChatCount')"
        v-model:model-value="modelValue.extraChatCount"
        :regle-validation="validationFields?.extraChatCount"
      />
      <wt-multi-select
        :disabled="disableUserInput || modelValue.isSupervisor || !hasSupervisorReadAccess"
        :label="t('objects.supervisor')"
        :search-method="AgentsAPI.getSupervisorOptions"
        v-model:model-value="modelValue.supervisor"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="t('objects.ccenter.agents.taskCount')"
        v-model:model-value="modelValue.taskCount"
        :regle-validation="validationFields?.taskCount"
        required
      />
      <wt-switcher
        :disabled="disableUserInput"
        :label="t('objects.ccenter.agents.isSupervisor')"
        v-model:model-value="modelValue.isSupervisor"
        class="opened-agent-general__switcher"
      />
      <div class="opened-agent-general__switcher opened-agent-general__screen-control">
        <wt-switcher
          :disabled="disableUserInput || disabledAgentScreenControl"
          :label="t('objects.ccenter.agents.agentScreenControl')"
          v-model:model-value="modelValue.screenControl"
        />

        <span
          v-if="disabledAgentScreenControl"
          class="opened-agent-general__screen-control-hint typo-body-2"
        >
          {{ t('objects.ccenter.agents.agentScreenControlHint') }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
	AgentsAPI,
	MediaAPI,
	RegionsAPI,
	TeamsAPI,
	UsersAPI,
} from '@webitel/api-services/api';
import type { EngineAgent } from '@webitel/api-services/gen/models';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<EngineAgent>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<EngineAgent>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasUserReadAccess } = useUserAccessControl(
	WtObject.User,
);
const { hasReadAccess: hasTeamReadAccess } = useUserAccessControl(
	WtObject.Team,
);
const { hasReadAccess: hasAuditorReadAccess } = useUserAccessControl(
	WtObject.User,
);
const { hasReadAccess: hasSupervisorReadAccess } = useUserAccessControl(
	WtObject.User,
);
const { hasReadAccess: hasMediaReadAccess } = useUserAccessControl(
	WtObject.Media,
);
const { hasReadAccess: hasRegionReadAccess } = useUserAccessControl(
	WtObject.Region,
);

const disabledAgentScreenControl = computed(
	() => !!modelValue.value.id && !modelValue.value.allowSetScreenControl,
);
</script>

<style scoped>
.opened-agent-general__switcher {
  align-self: center;
}

.opened-agent-general__screen-control {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2xs);
}
</style>
