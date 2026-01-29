<template>
  <section class="opened-storage-policy-general">
    <apply-to-files-popup
      :id="itemInstance.id"
      :shown="isPopupOpened"
      @close="closePopup"
    />
    <encryption-alert-popup
      :shown="isEncryptionAlertOpened"
      :message="encryptionAlertMessage"
      @close="closeEncryptionAlert"
      @confirm="confirmEncryptionChange"
    />
    <header class="content-header">
      <h3 class="content-title typo-heading-3">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid opened-storage-policy-general__grid-2col">
      <div class="grid-column">
        <wt-input-text
          :disabled="disableUserInput"
          :label="$t('objects.name')"
          :v="v.itemInstance.name"
          :model-value="itemInstance.name"
          required
          @update:model-value="setItemProp({ prop: 'name', value: $event })"
        />
        <wt-textarea
          :disabled="disableUserInput"
          :label="$t('objects.description')"
          :model-value="itemInstance.description"
          @update:model-value="setItemProp({ prop: 'description', value: $event })"
        />
        <wt-switcher
          :disabled="disableUserInput"
          :label="$t('reusable.state')"
          :model-value="itemInstance.enabled"
          @update:model-value="setItemProp({ prop: 'enabled', value: $event })"
        />
        <div class="opened-storage-policy-general-encrypt">
          <wt-switcher
            :disabled="disableUserInput"
            :label="$t('objects.integrations.storagePolicies.encryptFile')"
            :model-value="itemInstance.encrypt"
            @update:model-value="handleEncryptChange"
          />
          <span class="opened-storage-policy-general-encrypt__hint typo-body-2">
            {{ $t('objects.integrations.storagePolicies.encryptFileHint') }}
          </span>
        </div>
        <div class="opened-storage-policy-general-button-area">
          <div class="opened-storage-policy-general-button-area__content">
            <span>
              {{ $t('objects.integrations.storagePolicies.applyToFiles') }}
            </span>
            <wt-button @click="openPopup">
              {{ $t('vocabulary.apply') }}
            </wt-button>
          </div>
        </div>
      </div>
      <div class="grid-column">
        <wt-select
          :disabled="disableUserInput"
          :label="$t('vocabulary.channel', 2)"
          :v="v.itemInstance.channels"
          :value="channels"
          :options="channelsOptions"
          track-by="value"
          multiple
          required
          @input="setItemProp({ prop: 'channels', value: $event });"
        />
        <wt-tags-input
          :disabled="disableUserInput"
          :label="$t('objects.integrations.storagePolicies.mimeTypes')"
          :value="itemInstance.mimeTypes"
          :v="v.itemInstance.mimeTypes"
          taggable
          required
          :options="MimeTypes"
          @input="setItemProp({ prop: 'mimeTypes', value: $event })"
        />
        <wt-input-number
          :disabled="disableUserInput"
          :label="$t('objects.integrations.storagePolicies.retentionDays')"
          :min="0"
          :value="itemInstance.retentionDays"
          @update:model-value="setItemProp({ prop: 'retentionDays', value: Math.abs($event) })"
        />
        <wt-input-number
          :disabled="disableUserInput"
          :label="$t('objects.integrations.storagePolicies.maxDownloadSpeed')"
          :min="0"
          :model-value="itemInstance.speedDownload"
          @update:model-value="setItemProp({ prop: 'speedDownload', value: Math.abs($event) })"
        />
        <wt-input-number
          :disabled="disableUserInput"
          :label="$t('objects.integrations.storagePolicies.maxUploadSpeed')"
          :min="0"
          :value="itemInstance.speedUpload"
          @update:model-value="setItemProp({ prop: 'speedUpload', value: Math.abs($event) })"
        />
        <wt-input-number
          :disabled="disableUserInput"
          :label="$t('objects.integrations.storagePolicies.maxUploadSize')"
          :min="0"
          :value="itemInstance.maxUploadSize"
          @update:model-value="setItemProp({ prop: 'maxUploadSize', value: Math.abs($event) })"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { StorageUploadFileChannel } from '@webitel/api-services/gen/models';
import { MimeTypes } from '@webitel/ui-sdk/enums';
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters.js';
import deepCopy from 'deep-copy';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ApplyToFilesPopup from './apply-to-files-popup.vue';
import EncryptionAlertPopup from './encryption-alert-popup.vue';

export default {
  name: 'OpenedStoragePolicyGeneral',
  components: { ApplyToFilesPopup, EncryptionAlertPopup },
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  data: () => ({
    MimeTypes: Object.values(MimeTypes),
    isPopupOpened: false,
    isEncryptionAlertOpened: false,
    pendingEncryptValue: false,
  }),
  computed: {
    encryptionAlertMessage() {
      if (this.pendingEncryptValue) {
        return this.$t('objects.integrations.storagePolicies.encryptionEnableMessage');
      }
      return this.$t('objects.integrations.storagePolicies.encryptionDisableMessage');
    },
    channels() {
      const copy = deepCopy(this.itemInstance.channels);

      return copy.length ?
        copy.map((item) => {
          const channel = this.snakeToCamel(item.value || item);
          return {
            name: this.$t(`objects.integrations.storagePolicies.channels.${channel}`),
            value: channel,
          };
        })
        : [];
    },
    channelsOptions() {
      return Object.values(StorageUploadFileChannel)
        .filter((channel) =>
          channel !== StorageUploadFileChannel.UnknownChannel
          && channel !== StorageUploadFileChannel.KnowledgebaseChannel
          && channel !== StorageUploadFileChannel.CasesChannel,
        )
        .map((channel) => ({
          name: this.$t(`objects.integrations.storagePolicies.channels.${this.snakeToCamel(channel)}`),
          value: this.snakeToCamel(channel),
        }));
    },
  },
  methods: {
    snakeToCamel,
    openPopup() {
      this.isPopupOpened = true;
    },
    closePopup() {
      this.isPopupOpened = false;
    },
    apply() {
      this.closePopup();
    },
    handleEncryptChange(value) {
      this.pendingEncryptValue = value;
      this.isEncryptionAlertOpened = true;
    },
    confirmEncryptionChange() {
      this.setItemProp({ prop: 'encrypt', value: this.pendingEncryptValue });
      this.closeEncryptionAlert();
    },
    closeEncryptionAlert() {
      this.isEncryptionAlertOpened = false;
      this.pendingEncryptValue = false;
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
@use '@webitel/ui-sdk/src/css/main' as *;

.opened-storage-policy-general {
  &__grid-2col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    align-items: stretch;

    .grid-column {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

  }

  &-encrypt {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);

  }

  &-button-area {
    grid-row-start: span 3;
    height: -webkit-fill-available;
    display: grid;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--secondary-color);
    border-radius: var(--border-radius);

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }
  }
}
</style>
