<template>
  <section>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-for="prop of templateProps"
        :key="prop"
        v-model:model-value="updates[prop]"
        :disabled="disableUserInput"
        :label="t(`objects.routing.chatGateways.templates.${prop}`)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChatGatewayProvider } from '@webitel/api-services/enums';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { ChatGatewayTemplate } from '../enums/ChatGatewayTemplate.enum';

const modelValue = defineModel<ChatGatewayCard>({
	required: true,
});

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const updates = computed(() => {
	if (!modelValue.value.updates) modelValue.value.updates = {};
	return modelValue.value.updates as Record<ChatGatewayTemplate, string>;
});

/** [Claude] webchat has no file policy, so its file policy template is hidden */
const templateProps = computed(() =>
	Object.values(ChatGatewayTemplate).filter(
		(template) =>
			template !== ChatGatewayTemplate.FilePolicyFail ||
			modelValue.value.provider !== ChatGatewayProvider.WEBCHAT,
	),
);
</script>
