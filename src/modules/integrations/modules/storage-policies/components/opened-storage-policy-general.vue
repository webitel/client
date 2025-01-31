<template>
  <section>
    <apply-to-files-popup
      :shown="isPopupOpened"
      :id="itemInstance.id"
      @close="closePopup"
    />
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$tc('vocabulary.channel', 2)"
        :v="v.itemInstance.channels"
        :value="channels"
        :options="channelsOptions"
        track-by="value"
        multiple
        required
        @input="this.setItemProp({ prop: 'channels', value: $event });"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
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
      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('reusable.state')"
        :value="itemInstance.enabled"
        @change="setItemProp({ prop: 'enabled', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storagePolicies.retentionDays')"
        :min-value="0"
        :value="itemInstance.retentionDays"
        type="number"
        @input="setItemProp({ prop: 'retentionDays', value: $event })"
      />
      <div class="button-area">
        <div class="button-area__content">
          <span>
            {{ $t('objects.integrations.storagePolicies.applyToFiles') }}
          </span>
          <wt-button @click="openPopup">
            {{ $t('vocabulary.apply') }}
          </wt-button>
        </div>
      </div>
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
  </section>
</template>

<script>
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters.js';
import deepCopy from 'deep-copy';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { StorageUploadFileChannel } from 'webitel-sdk';
import ApplyToFilesPopup from './apply-to-files-popup.vue';

export default {
  name: 'OpenedStoragePolicyGeneral',
  components: { ApplyToFilesPopup },
  mixins: [openedTabComponentMixin],
  computed: {
    channels() {
      const copy = deepCopy(this.itemInstance.channels);

      return copy.length ?
        copy.map((item) => {
          const channel = this.snakeToCamel(item.value || item);
          return {
            name: this.$t(`objects.integrations.storagePolicies.channels.${channel}`),
            value: channel,
          }
        })
        : [];
      },
    channelsOptions() {
      return Object.values(StorageUploadFileChannel)
      .filter((channel) =>
        channel !== StorageUploadFileChannel.UnknownChannel
      && channel !== StorageUploadFileChannel.KnowledgebaseChannel
      && channel !== StorageUploadFileChannel.CasesChannel
      )
      .map((channel) => ({
        name: this.$t(`objects.integrations.storagePolicies.channels.${this.snakeToCamel(channel)}`),
        value: this.snakeToCamel(channel),
      }));
    }
  },
  data: () => ({
    isPopupOpened: false,
  }),
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

.button-area {
  grid-row-start: span 3;
  height: -webkit-fill-available;
  display: grid;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--btn-secondary-color);
  border-radius: var(--border-radius);

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}

</style>
