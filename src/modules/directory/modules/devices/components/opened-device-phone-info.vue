<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.directory.devices.phoneInfo') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.ip"
        :disabled="disableUserInput"
        :label="t('objects.directory.devices.ipv4')"
        :regle-validation="validationFields?.ip"
      />
      <wt-input-text
        v-model:model-value="modelValue.brand"
        :disabled="disableUserInput"
        :label="t('objects.directory.devices.vendor')"
      />
      <wt-input-text
        v-model:model-value="modelValue.model"
        :disabled="disableUserInput"
        :label="t('objects.directory.devices.model')"
      />
      <wt-input-text
        v-model:model-value="modelValue.mac"
        :disabled="disableUserInput"
        :label="t('objects.directory.devices.mac')"
        :regle-validation="validationFields?.mac"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import type { ApiDevice } from '@webitel/api-services/gen/models';
import { WtInputText } from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<ApiDevice>({
	required: true,
});

defineProps<{
	validationFields?: {
		[K in keyof ApiDevice]?: RegleSchemaFieldStatus<ApiDevice[K]>;
	};
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
</script>
