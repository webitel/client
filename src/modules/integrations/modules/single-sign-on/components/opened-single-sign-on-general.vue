<template>
  <section class="opened-single-sign-on-general">
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        v-model:model-value="modelValue.name"
        required
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="t('objects.integrations.singleSignOn.clientSecret')"
        :regle-validation="validationFields?.clientSecret"
        hide-input-value
        v-model:model-value="modelValue.clientSecret"
        required
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="t('objects.integrations.singleSignOn.clientId')"
        :regle-validation="validationFields?.clientId"
        v-model:model-value="modelValue.clientId"
        required
      />

      <wt-input-text
        :disabled="disableUserInput"
        :label="t('objects.integrations.singleSignOn.discoveryUrl')"
        :regle-validation="validationFields?.discoveryUrl"
        v-model:model-value="modelValue.discoveryUrl"
        required
      />


    </div>
    <div class="object-input-grid opened-single-sign-on-general__token-grid">
      <single-sign-on-token v-if="modelValue.id" />

      <wt-multi-select
        v-model:model-value="modelValue.scopes"
        :label="t('objects.integrations.singleSignOn.scopes')"
        :options="modelValue.scopes"
        :data-key="null"
        chips-view
        allow-custom-values
      />
    </div>

  </section>
</template>

<script setup lang="ts">
import { RegleSchemaFieldStatus } from '@regle/schemas';
import type { ApiOAuthService } from '@webitel/api-services/gen/models';
import { WtInputText } from '@webitel/ui-sdk/components';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { SingleSignOnType } from '../enums/SingleSignOnType.enum';
import SingleSignOnToken from './single-sign-on-token.vue';

const modelValue = defineModel<ApiOAuthService>();

defineProps<{
	validationFields?: {
		[K in keyof ApiOAuthService]?: RegleSchemaFieldStatus<ApiOAuthService[K]>;
	};
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();

watch(
	() => modelValue.value.discoveryUrl,
	(val) => {
		const condition =
			val && modelValue.value.discoveryUrl.includes(SingleSignOnType.Facebook);
		modelValue.value.type = condition
			? SingleSignOnType.Facebook
			: SingleSignOnType.OpenId;
	},
	{
		immediate: true,
	},
);
</script>

<style scoped>
.opened-single-sign-on-general__token-grid {
  grid-auto-rows: 1fr;
  align-items: stretch;
  height: 100%;
}
</style>
