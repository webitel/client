<template>
  <wt-editable-list
    v-model:model-value="modelValue.claims"
    :create-row="createMapping"
    :disabled="disableUserInput"
    :headers="headers"
  >
    <template #title>
      <h3 class="table-title__title">
        {{ t('objects.integrations.singleSignOn.mapping') }}
      </h3>
    </template>
    <template #type="{ item }">
      <wt-input-text
        v-model:model-value="item.type"
        v-tooltip="t('objects.integrations.singleSignOn.mappingKeyHint')"
        :disabled="disableUserInput"
        :placeholder="t('vocabulary.keys')"
      />
    </template>
    <template #value="{ item }">
      <wt-input-text
        v-model:model-value="item.value"
        :disabled="disableUserInput"
        :placeholder="t('vocabulary.values')"
      />
    </template>
  </wt-editable-list>
</template>

<script setup lang="ts">
import type {
	ApiClaim,
	ApiOAuthService,
} from '@webitel/api-services/gen/models';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<ApiOAuthService>({
	required: true,
});

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();

const headers = computed(() => [
	{
		value: 'type',
		text: t('vocabulary.keys'),
	},
	{
		value: 'value',
		text: t('vocabulary.values'),
	},
]);

const createMapping = (): ApiClaim => ({
	type: '',
	value: '',
});
</script>
