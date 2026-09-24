<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <copy-input
        v-if="modelValue.hotdesk"
        :label="t('objects.directory.devices.authId')"
        :regle-validation="validationFields?.account"
        :value="modelValue.account"
        disabled
        required
      />
      <wt-input-text
        v-else
        v-model:model-value="modelValue.account"
        :disabled="disableUserInput"
        :label="t('objects.directory.devices.authId')"
        :regle-validation="validationFields?.account"
        required
      />
      <password-input
        :disabled="disableUserInput"
        :regle-validation="validationFields?.password"
        :value="modelValue.password"
        required
        @input="modelValue.password = $event"
      />
      <wt-single-select
        v-model:model-value="modelValue.user"
        :disabled="disableUserInput"
        :label="t('objects.user')"
        :search-method="UsersAPI.getLookup"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import { UsersAPI } from '@webitel/api-services/api';
import type { ApiDevice } from '@webitel/api-services/gen/models';
import { WtInputText, WtSingleSelect } from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';

import CopyInput from '../../../../../app/components/utils/copy-input.vue';
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
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
