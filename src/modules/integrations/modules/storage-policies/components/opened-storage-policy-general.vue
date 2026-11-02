<template>
  <section class="opened-storage-policy-general">
    <apply-to-files-popup
      :id="modelValue.id"
      :shown="isApplyPopupOpened"
      @close="isApplyPopupOpened = false"
    />
    <encryption-alert-popup
      :shown="isEncryptionAlertOpened"
      :message="encryptionAlertMessage"
      @close="isEncryptionAlertOpened = false"
      @confirm="confirmEncryptionChange"
    />
    <div class="opened-card-input-grid opened-storage-policy-general__grid">
      <div class="opened-storage-policy-general__column">
        <wt-input-text
          v-model:model-value="modelValue.name"
          :disabled="disableUserInput"
          :label="t('objects.name')"
          :regle-validation="validationFields?.name"
          required
        />
        <wt-textarea
          v-model:model-value="modelValue.description"
          :disabled="disableUserInput"
          :label="t('objects.description')"
        />
        <wt-switcher
          v-model:model-value="modelValue.enabled"
          :disabled="disableUserInput"
          :label="t('reusable.state')"
        />
        <div class="opened-storage-policy-general__encrypt">
          <wt-switcher
            :disabled="disableUserInput"
            :label="t('objects.integrations.storagePolicies.encryptFile')"
            :model-value="modelValue.encrypt"
            @update:model-value="isEncryptionAlertOpened = true"
          />
          <span class="typo-body-2">
            {{ t('objects.integrations.storagePolicies.encryptFileHint') }}
          </span>
        </div>
        <div class="opened-storage-policy-general__apply">
          <span>
            {{ t('objects.integrations.storagePolicies.applyToFiles') }}
          </span>
          <wt-button @click="isApplyPopupOpened = true">
            {{ t('vocabulary.apply') }}
          </wt-button>
        </div>
      </div>
      <div class="opened-storage-policy-general__column">
        <wt-multi-select
          v-model:model-value="modelValue.channels"
          :disabled="disableUserInput"
          :label="t('vocabulary.channel', 2)"
          :options="channelOptions"
          :regle-validation="validationFields?.channels"
          data-key="value"
          option-value="value"
          required
        />
        <wt-multi-select
          v-model:model-value="modelValue.mimeTypes"
          :data-key="null"
          :disabled="disableUserInput"
          :label="t('objects.integrations.storagePolicies.mimeTypes')"
          :options="mimeTypeOptions"
          :regle-validation="validationFields?.mimeTypes"
          allow-custom-values
          chips-view
          required
        />
        <wt-input-number
          v-for="{ prop, locale } of numberFields"
          :key="prop"
          :disabled="disableUserInput"
          :label="t(locale)"
          :min="0"
          :model-value="modelValue[prop]"
          @update:model-value="modelValue[prop] = Math.abs($event)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { StorageUploadFileChannel } from '@webitel/api-services/gen/models';
import type { StoragePolicyCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { MimeTypes } from '@webitel/ui-sdk/enums';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import ApplyToFilesPopup from './apply-to-files-popup.vue';
import EncryptionAlertPopup from './encryption-alert-popup.vue';

const modelValue = defineModel<StoragePolicyCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<StoragePolicyCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

/** [Claude] these channels have no files a policy could apply to */
const hiddenChannels: string[] = [
	StorageUploadFileChannel.UnknownChannel,
	StorageUploadFileChannel.KnowledgebaseChannel,
	StorageUploadFileChannel.CasesChannel,
];

const channelOptions = computed(() =>
	Object.values(StorageUploadFileChannel)
		.filter((channel) => !hiddenChannels.includes(channel))
		.map((channel) => ({
			value: channel,
			label: t(`objects.integrations.storagePolicies.channels.${channel}`),
		})),
);

/** [Claude] the known mime types, plus the custom ones the policy already has */
const mimeTypeOptions = computed(() => [
	...new Set([
		...Object.values(MimeTypes),
		...(modelValue.value.mimeTypes ?? []),
	]),
]);

/** [Claude] the limits share one input, the api takes no negatives */
const numberFields = [
	{
		prop: 'retentionDays',
		locale: 'objects.integrations.storagePolicies.retentionDays',
	},
	{
		prop: 'speedDownload',
		locale: 'objects.integrations.storagePolicies.maxDownloadSpeed',
	},
	{
		prop: 'speedUpload',
		locale: 'objects.integrations.storagePolicies.maxUploadSpeed',
	},
	{
		prop: 'maxUploadSize',
		locale: 'objects.integrations.storagePolicies.maxUploadSize',
	},
] as const;

const isApplyPopupOpened = ref(false);

const isEncryptionAlertOpened = ref(false);

/** [Claude] the switch only asks; encryption flips once the alert is confirmed */
const encryptionAlertMessage = computed(() =>
	modelValue.value.encrypt
		? t('objects.integrations.storagePolicies.encryptionDisableMessage')
		: t('objects.integrations.storagePolicies.encryptionEnableMessage'),
);

const confirmEncryptionChange = () => {
	modelValue.value.encrypt = !modelValue.value.encrypt;
	isEncryptionAlertOpened.value = false;
};
</script>

<style scoped>
.opened-storage-policy-general__grid {
  align-items: stretch;
}

.opened-storage-policy-general__column,
.opened-storage-policy-general__encrypt,
.opened-storage-policy-general__apply {
  display: flex;
  flex-direction: column;
}

.opened-storage-policy-general__column {
  gap: var(--spacing-md);
}

.opened-storage-policy-general__encrypt {
  gap: var(--spacing-2xs);
}

.opened-storage-policy-general__apply {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius);
}
</style>
