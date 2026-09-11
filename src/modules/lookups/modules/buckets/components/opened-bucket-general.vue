<template>
  <section class="opened-bucket-general">
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="opened-card-input-grid opened-card-input-grid--1-col opened-card-input-grid--w50">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-textarea
        v-model:model-value="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import type { EngineBucket } from '@webitel/api-services/gen/models';
import { WtInputText, WtTextarea } from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<EngineBucket>({
	required: true,
});

defineProps<{
	validationFields?: {
		[K in keyof EngineBucket]?: RegleSchemaFieldStatus<EngineBucket[K]>;
	};
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
</script>
