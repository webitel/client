<template>
  <div class="qrcode-two-factor-auth">

    <wt-popup
      v-if="isConfirmationPopup"
      @close="closeConfirmationPopup"
    >

      <template #title>
        {{ t('reusable.warning') }}
      </template>

      <template #main>
        {{ t('objects.directory.users.askingAlert') }}
      </template>

      <template #actions>
        <wt-button
          color="secondary"
          @click="closeConfirmationPopup"
        >
          {{ t('vocabulary.no') }}
        </wt-button>

        <wt-button
          color="error"
          @click="regenerateUrl"
        >
          {{ t('vocabulary.yes') }}
        </wt-button>
      </template>
    </wt-popup>

    <div
      ref="qrcodeContainer"
      class="qrcode-two-factor-auth__canvas"
    >
      <qrcode-vue
        :value="url"
        level="H"
      />
    </div>

    <div class="qrcode-two-factor-auth__wrapper">
      <wt-button
        color="secondary"
        @click="download"
        wide
      >
        <wt-icon icon="download" />
        {{ t('objects.directory.users.download') }}
      </wt-button>

      <wt-button
        color="secondary"
        @click="openConfirmationPopup"
        wide
      >
        <wt-icon icon="refresh" />
        {{ t('objects.directory.users.regenerate') }}
      </wt-button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { UsersAPI } from '@webitel/api-services/api';
import { storeToRefs } from 'pinia';
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUsersCardStore } from '../../stores/card/usersCardStore';

defineProps<{
	url: string;
}>();

const { t } = useI18n();

const cardStore = useUsersCardStore();
const { itemId } = storeToRefs(cardStore);
const { initialize } = cardStore;

const qrcodeContainer = ref<HTMLElement>();
const isConfirmationPopup = ref(false);

const download = () => {
	const canvas = qrcodeContainer.value?.querySelector('canvas');
	if (!canvas) return;
	const link = document.createElement('a');
	link.download = 'qr-code.png';
	link.href = canvas.toDataURL('image/png');
	link.click();
};

const openConfirmationPopup = () => {
	isConfirmationPopup.value = true;
};

const closeConfirmationPopup = () => {
	isConfirmationPopup.value = false;
};

const regenerateUrl = async () => {
	await UsersAPI.generateTotpUrl({
		id: itemId.value,
	});
	await initialize({
		itemId: itemId.value,
	});
	closeConfirmationPopup();
};
</script>

<style scoped>
.qrcode-two-factor-auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.qrcode-two-factor-auth__wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.qrcode-two-factor-auth__canvas {
  display: flex;
  box-shadow: var(--elevation-5);
}
</style>
