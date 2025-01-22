<template>
  <section>
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
        :value="itemInstance.channels"
        :options="channelsOptions"
        track-by="value"
        multiple
        required
        @input="setItemProp({ prop: 'channels', value: $event})"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      />
      {{ itemInstance.mimeTypes }}
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storagePolicies.mimeTypes')"
        :min-value="0"
        :v="v.itemInstance.mimeTypes"
        :value="itemInstance.mimeTypes"
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
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { StorageUploadFileChannel } from 'webitel-sdk';

export default {
  name: 'OpenedSingleSignOnGeneral',
  mixins: [openedTabComponentMixin],
  computed: {
    channelsOptions() {
      return Object.values(StorageUploadFileChannel)
      .filter((channel) => channel !== StorageUploadFileChannel.UnknownChannel)
      .map((channel) => ({
        name: this.$t(`objects.lookups.communications.channels.${channel}`),
        value: channel,
      }));
    }
  },
  methods: {
    // loadFlows(params) {
    //   return StoragePoliciesAPI.getLookup(params);
    // },
  },
};
</script>

<style scoped>

</style>
