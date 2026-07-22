<template>
  <div class="single-sign-on-token">
    <p class="typo-body-2">
      {{ t('objects.integrations.singleSignOn.inspectDescription') }}
    </p>
    <wt-button @click="getTokenData" :disabled="disabled">
      {{ t('objects.integrations.singleSignOn.inspect') }}
    </wt-button>

    <p
      v-if="!isEmpty(tokenData)"
      class="typo-body-1 single-sign-on-token__action"
      @click="handleShownPopup">{{ t('objects.integrations.singleSignOn.showToken') }}</p>

    <wt-popup
      :shown="isShownPopup"
      closable
      @close="handleShownPopup"
    >
      <template #title>
        {{ t('objects.integrations.tokens.tokens') }}
      </template>

      <template #main><pre>{{tokenData}}</pre></template>

      <template #actions>
        <wt-button
          color="secondary"
          @click="handleShownPopup"
        >
          {{ t('objects.close') }}
        </wt-button>
      </template>
    </wt-popup>

  </div>
</template>

<script setup lang="ts">
import { isEmpty } from '@webitel/ui-sdk/scripts';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useInspectSingleSignOnToken } from '../composables/useInspectSingleSignOnToken';

const props = defineProps<{
	disabled?: boolean;
}>();

const { t } = useI18n();
const route = useRoute();
const { getTokenDataFromStorage, inspectToken } = useInspectSingleSignOnToken();

const isShownPopup = ref(false);
const tokenData = ref('');

const handleShownPopup = () => {
	isShownPopup.value = !isShownPopup.value;
};

const setTokenData = (data) => {
	tokenData.value = data ? JSON.stringify(data, null, 2) : '';
};

const setInitialTokenData = () => {
	const currentToken = getTokenDataFromStorage(route.params.id);
	setTokenData(currentToken);
};

onMounted(() => {
	setInitialTokenData();
});

watch(() => route.params.id, setInitialTokenData);

const getTokenData = () => {
	inspectToken(route.params.id, (data) => {
		if (!data) return;

		setTokenData(data);
		isShownPopup.value = true;
	});
};
</script>

<style scoped>
.single-sign-on-token {
  border-radius: var(--spacing-sm);
  border: 1px solid var(--secondary-color);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.single-sign-on-token__action {
  color: var(--link-color);
  cursor: pointer;
}
</style>
