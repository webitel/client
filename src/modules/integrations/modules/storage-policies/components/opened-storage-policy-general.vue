<template>
  <section class="opened-storage-policy-general">
    <apply-to-files-popup
      :id="itemInstance.id"
      :shown="isPopupOpened"
      @close="closePopup"
    />
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid opened-storage-policy-general__grid-2col">
      <div class="grid-column">
        <wt-input
          :disabled="disableUserInput"
          :label="$t('objects.name')"
          :v="v.itemInstance.name"
          :value="itemInstance.name"
          required
          @input="setItemProp({ prop: 'name', value: $event })"
        />
        <wt-textarea
          :disabled="disableUserInput"
          :label="$t('objects.description')"
          :value="itemInstance.description"
          @input="setItemProp({ prop: 'description', value: $event })"
        />
        <wt-switcher
          :disabled="disableUserInput"
          :label="$t('reusable.state')"
          :value="itemInstance.enabled"
          @change="setItemProp({ prop: 'enabled', value: $event })"
        />
        <wt-switcher
          :disabled="disableUserInput"
          :label="$t('objects.integrations.storagePolicies.encryptFile')"
          :value="itemInstance.encrypt"
          @change="setItemProp({ prop: 'encrypt', value: $event })"
        />
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
          :label="$tc('vocabulary.channel', 2)"
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
          @input="setItemProp({ prop: 'mimeTypes', value: $event })"
        />
        <wt-input
          :disabled="disableUserInput"
          :label="$t('objects.integrations.storagePolicies.retentionDays')"
          :min-value="0"
          :value="itemInstance.retentionDays"
          type="number"
          @input="setItemProp({ prop: 'retentionDays', value: $event })"
        />
        <wt-input
          :disabled="disableUserInput"
          :label="$t('objects.integrations.storagePolicies.maxDownloadSpeed')"
          :min-value="0"
          :value="itemInstance.speedDownload"
          type="number"
          @input="setItemProp({ prop: 'speedDownload', value: $event })"
        />
        <wt-input
          :disabled="disableUserInput"
          :label="$t('objects.integrations.storagePolicies.maxUploadSpeed')"
          :min-value="0"
          :value="itemInstance.speedUpload"
          type="number"
          @input="setItemProp({ prop: 'speedUpload', value: $event })"
        />
        <wt-input
          :disabled="disableUserInput"
          :label="$t('objects.integrations.storagePolicies.maxUploadSize')"
          :min-value="0"
          :value="itemInstance.maxUploadSize"
          type="number"
          @input="setItemProp({ prop: 'maxUploadSize', value: $event })"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters.js';
import deepCopy from 'deep-copy';
import { StorageUploadFileChannel } from 'webitel-sdk';

import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ApplyToFilesPopup from './apply-to-files-popup.vue';

export default {
  name: 'OpenedStoragePolicyGeneral',
  components: { ApplyToFilesPopup },
  mixins: [openedTabComponentMixin],
  data: () => ({
    isPopupOpened: false,
  }),
  computed: {
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
  },
};
</script>

<style scoped lang="scss">
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
