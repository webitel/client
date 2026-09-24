<template>
  <section class="opened-user-communications">
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.directory.users.communications') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.email"
        :disabled="disableUserInput"
        :label="t('objects.email')"
        :regle-validation="validationFields?.email"
      />

      <wt-single-select
        v-model:model-value="modelValue.contact"
        :disabled="disableUserInput || !hasContactsReadAccess"
        :label="t('vocabulary.contact', 1)"
        :search-method="ContactsAPI.getLookup"
        data-key="name"
      />

      <wt-input-text
        v-model:model-value="modelValue.chatName"
        :disabled="disableUserInput"
        :label="t('objects.directory.users.chatName')"
        :regle-validation="validationFields?.chatName"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ContactsAPI } from '@webitel/api-services/api';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { WtObject } from '@webitel/ui-sdk/enums';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import type { User } from '../types/User';

const modelValue = defineModel<User>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<User>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl(WtObject.User);
const { hasReadAccess: hasContactsReadAccess } = useUserAccessControl(
	WtObject.Contact,
);
</script>
