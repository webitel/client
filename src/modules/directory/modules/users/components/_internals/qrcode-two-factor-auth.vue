<template>
  <div class="qrcode-two-factor-auth">

    <wt-popup
      v-if="isConfirmationPopup"
      @close="closeConfirmationPopup"
    >

      <template #title>
        {{ $t('reusable.warning') }}
      </template>

      <template #main>
        {{ $t('objects.directory.users.askingAlert') }}
      </template>

      <template #actions>
        <wt-button
          color="secondary"
          @click="closeConfirmationPopup"
        >
          {{ $t('vocabulary.no') }}
        </wt-button>

        <wt-button
          color="error"
          @click="regenerateUrl"
        >
          {{ $t('vocabulary.yes') }}
        </wt-button>
      </template>
    </wt-popup>

    <div
      ref="qrcodeContainer"
      class="qrcode-two-factor-auth__canvas"
    >
      <qrcode-vue
        ref="qrcode"
        :value="props.url"
        level="H"
      />
    </div>

    <div class="qrcode-two-factor-auth__wrapper">
      <wt-button
        color="secondary"
        @click="download"
      >
        {{ $t('objects.directory.users.download') }}
      </wt-button>

      <wt-button
        color="error"
        @click="openConfirmationPopup"
      >
        {{ $t('objects.directory.users.regenerate') }}
      </wt-button>
    </div>

  </div>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
	namespace: {
		type: String,
	},
	url: {
		type: String,
		required: true,
	},
});

const store = useStore();

const qrcodeContainer = ref();
const isConfirmationPopup = ref(false);

function download() {
	const canvas = qrcodeContainer.value.querySelector('canvas');
	const link = document.createElement('a');
	link.download = 'qr-code.png';
	link.href = canvas.toDataURL('image/png');
	link.click();
}

async function regenerateUrl() {
	await store.dispatch(`${props.namespace}/REGENERATE_2FA_URL`);
	closeConfirmationPopup();
}

function openConfirmationPopup() {
	isConfirmationPopup.value = true;
}

function closeConfirmationPopup() {
	isConfirmationPopup.value = false;
}
</script>

<style lang="scss" scoped>
.qrcode-two-factor-auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);

  &__wrapper {
    display: flex;
    gap: var(--spacing-sm);
  }

  &__canvas {
    display: flex;
    box-shadow: var(--elevation-5);
  }
}
</style>
