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
      <form @submit.prevent="save">
        <wt-input-text
          v-model:model-value="modelValue.usage"
          :label="t('objects.name')"
          :regle-validation="validationFields?.usage"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="hasValidationErrors"
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
import type { ApiUserAccessToken } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import UsersRouteNames from '../../../routes/_internals/UsersRouteNames.enum';
import { useUserTokenCardStore } from '../stores/card/userTokenCardStore';

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
} = useNestedCardComponent<ApiUserAccessToken>({
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
