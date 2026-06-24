<template>
  <section>
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
      <wt-password
        :disabled="disableUserInput"
        :label="t('objects.integrations.singleSignOn.clientSecret')"
        :regle-validation="validationFields?.clientSecret"
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

      <single-sign-on-token v-if="modelValue.id" />

      <wt-multi-select
        v-model:model-value="modelValue.scopes"
        :label="t('objects.integrations.singleSignOn.scopes')"
        :options="modelValue.scopes"
        allow-custom-values
      />

      </div>

  </section>
</template>

<script setup lang="ts">
import { RegleSchemaFieldStatus } from '@regle/schemas';
import type { ApiOAuthService } from '@webitel/api-services/gen/models';
import { useI18n } from 'vue-i18n';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import SingleSignOnToken from './single-sign-on-token.vue';
import { WtInputText } from '@webitel/ui-sdk/components';

const modelValue = defineModel<ApiOAuthService>();

defineProps<{
	validationFields?: {
		[K in keyof ApiOAuthService]?: RegleSchemaFieldStatus<
			RegleSchemaFieldStatus[K]
		>;
	};
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
</script>

<style scoped>
</style>
