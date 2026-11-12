<template>
  <wt-popup
    class="token-created-popup"
    shown
    @close="emit('close')"
  >
    <template #title>
      {{ t('objects.directory.users.tokenPopupHeader') }}
    </template>
    <template #main>
      <div class="token-created-popup__token typo-subtitle-2">
        {{ token }}
      </div>
      <h4 class="token-created-popup__text typo-body-1">
        {{ t('objects.directory.users.tokenPopupText') }}
      </h4>
    </template>
    <template #actions>
      <wt-button @click="copy">
        {{ t('objects.directory.users.tokenPopupCopy') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="saveTxt"
      >
        {{ t('objects.directory.users.tokenPopupSave') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { ButtonColor } from '@webitel/ui-sdk/enums';
import clipboardCopy from 'clipboard-copy';
import { saveAs } from 'file-saver-es';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
	token: string;
	userName?: string;
}>();

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();

const copy = () => clipboardCopy(props.token);

const saveTxt = () =>
	saveAs(
		new Blob(
			[
				props.token,
			],
			{
				type: 'text/plain;charset=utf-8',
			},
		),
		`${props.userName}-token.txt`,
	);
</script>

<style scoped>
.token-created-popup__token {
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-sm);
  border: 2px solid var(--error-color);
  border-radius: var(--border-radius--md);
  text-align: center;
  word-break: break-all;
}
</style>
