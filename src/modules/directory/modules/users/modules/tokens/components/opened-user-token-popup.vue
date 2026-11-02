<template>
  <wt-popup
    :shown="tokenId === 'new'"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ t('objects.directory.users.token', 2) }}
    </template>
    <template #main>
      <form
        class="opened-user-token-popup__form"
        @submit.prevent="save"
      >
        <wt-input-text
          v-model:model-value="modelValue.usage"
          :label="t('objects.name')"
          :regle-validation="validationFields?.usage"
          required
        />
        <wt-input-number
          v-model:model-value="modelValue.expiryDays"
          :label="t('objects.directory.users.expiryDays')"
          :min="0"
          :regle-validation="validationFields?.expiryDays"
        />
        <wt-multi-select
          v-model:model-value="modelValue.notifyUsers"
          :label="t('objects.directory.users.users', 2)"
          :search-method="UsersAPI.getLookup"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="hasValidationErrors || !modelValue.usage"
        @click="save"
      >
        {{ t('objects.add') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { UsersAPI } from '@webitel/api-services/api';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import UsersRouteNames from '../../../routes/_internals/UsersRouteNames.enum';
import {
	type UserTokenCard,
	useUserTokenCardStore,
} from '../stores/card/userTokenCardStore';

const props = defineProps<{
	parentId: string | number;
}>();

const emit = defineEmits<{
	created: [
		token: string,
	];
}>();

const { t } = useI18n();
const route = useRoute();

const userTokenCardStore = useUserTokenCardStore();
const { originalItemInstance } = storeToRefs(userTokenCardStore);

const {
	modelValue,
	validationFields,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<UserTokenCard>({
	useCardStore: useUserTokenCardStore,
	routeParamName: 'tokenId',
	parentId: () => props.parentId,
});

const tokenId = computed(() => route.params.tokenId);

const { close } = useClose(UsersRouteNames.TOKENS);

const save = async () => {
	await saveItem();
	const token = originalItemInstance.value?.token;
	if (!token) return;
	close();
	emit('created', token);
};
</script>

<style scoped>
.opened-user-token-popup__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
