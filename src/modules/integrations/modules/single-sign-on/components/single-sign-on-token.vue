<template>
  <div class="single-sign-on-token">
    <p class="typo-body-2">
      {{ t('objects.integrations.singleSignOn.inspectDescription') }}
    </p>
    <wt-button @click="getToken">
      {{ t('objects.integrations.singleSignOn.inspect') }}
    </wt-button>

    <p
      v-if="token"
      class="typo-body-1 single-sign-on-token__action"
      @click="handleShownPopup">{{ t('objects.integrations.singleSignOn.showToken') }}</p>

    <wt-popup
      :shown="isShownPopup"
      size="md"
      closable
      @close="handleShownPopup"
    >
      <template #title>
        {{ t('objects.integrations.tokens.tokens') }}
      </template>

      <template #main>{{token}}</template>

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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import InspectTokenAPI from '../api/inspectToken';

const { t } = useI18n();
const route = useRoute();

const isShownPopup = ref(false);
const token = ref('');

const handleShownPopup = () => {
  isShownPopup.value = !isShownPopup.value;
};

const getToken = async () => {
  const { idToken } = await InspectTokenAPI.get({
    id: route.params.id,
  });
  token.value = idToken;
  handleShownPopup();
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
