<template>
  <div class="single-sign-on-token">
    <p class="typo-body-2">
      {{ t('objects.integrations.singleSignOn.inspectDescription') }}
    </p>
    <wt-button @click="getTokenData">
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
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { isEmpty } from '@webitel/ui-sdk/scripts';

const STORAGE_KEY = 'ssoInspectToken';

const { t } = useI18n();
const route = useRoute();

const isShownPopup = ref(false);
const tokenData = ref({});

const handleShownPopup = () => {
	isShownPopup.value = !isShownPopup.value;
};

const setInitialTokenData = () => {
  const currentToken = localStorage.getItem(STORAGE_KEY);
  if (!currentToken) return;

  try {
    const rowToken = JSON.parse(currentToken);
    tokenData.value = JSON.stringify(rowToken, null, 2);
  } catch (error) {
    throw error;
  }
}

onMounted(() => {
  setInitialTokenData();
});

const getTokenData = () => {
  const url = `/api/login/${route.params.id}/inspect`;

  const tab = window.open(url, '_blank');
  if (!tab) return;

  let sawCrossOrigin = false;
  const startTime = Date.now();
  const TIMEOUT_MS = 120_000;

  const checkTab = setInterval(() => {
    if (tab.closed) {
      clearInterval(checkTab);
      console.log('tab closed');
      return;
    }

    if (Date.now() - startTime > TIMEOUT_MS) {
      clearInterval(checkTab);
      console.log('timeout');
      tab.close();
      return;
    }

    try {
      tab.location.origin;
    } catch (e) {
      console.log('cross origin');
      sawCrossOrigin = true;
      return;
    }

    if (!sawCrossOrigin) return;

    try {
      const bodyText = tab.document.body?.textContent?.trim();
      if (!bodyText) return;

      const data = JSON.parse(bodyText);

      clearInterval(checkTab);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      tokenData.value = JSON.stringify(data, null, 2);
      tab.close();
      isShownPopup.value = true;
    } catch (error) {
      clearInterval(checkTab);
      tab.close();
      throw error;
    }
  }, 300);
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
