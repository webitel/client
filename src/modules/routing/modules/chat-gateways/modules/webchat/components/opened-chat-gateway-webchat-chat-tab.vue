<template>
  <section>
    <header class="content-header">
      <wt-icon
        icon="web-chat"
        icon-prefix="messenger"
        size="sm"
      />
      <h3 class="content-title">
        {{ $t('objects.routing.chatGateways.webchat.chat.chat') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-switcher
        :label="$t('objects.enabled')"
        :model-value="itemInstance.metadata.chat.enabled"
        @update:model-value="setChatMetadata({ prop: 'enabled', value: $event })"
      />
      <div />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.readTimeout')"
        :v="v.itemInstance.metadata.readTimeout"
        :value="itemInstance.metadata.readTimeout"
        type="number"
        @input="setItemMetadata({ prop: 'readTimeout', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$tc('objects.routing.flow.flow', 1)"
        :search-method="loadDropdownOptionsList"
        :v="v.itemInstance.flow"
        :value="itemInstance.flow"
        @input="setFlow"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.writeTimeout')"
        :v="v.itemInstance.metadata.writeTimeout"
        :value="itemInstance.metadata.writeTimeout"
        type="number"
        @input="setItemMetadata({ prop: 'writeTimeout', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.handshakeTimeout')"
        :v="v.itemInstance.metadata.handshakeTimeout"
        :value="itemInstance.metadata.handshakeTimeout"
        type="number"
        @input="setItemMetadata({ prop: 'handshakeTimeout', value: $event })"
      />
      <wt-switcher
        :label="$t('objects.routing.chatGateways.webchat.chat.openTimeout')"
        :model-value="itemInstance.metadata.chat.timeoutIsActive"
        @update:model-value="setChatMetadata({ prop: 'timeoutIsActive', value: $event })"
      />
      <wt-input
        :disabled="disableOpenTimeout"
        :label="$t('objects.routing.chatGateways.webchat.chat.openTimeoutSec')"
        :v="v.itemInstance.metadata.chat.openTimeout"
        :value="itemInstance.metadata.chat.openTimeout"
        type="number"
        @input="setChatMetadata({ prop: 'openTimeout', value: $event })"
      />
      <wt-input
        v-model="mediaMaxSize"
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.webchat.metadata.mediaMaxSize')"
        type="number"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../../flow/api/flow';

export default {
  name: 'OpenedChatWebchatGeneralTab',
  mixins: [openedTabComponentMixin],
  computed: {
    disableOpenTimeout() {
      return !this.itemInstance.metadata.chat.timeoutIsActive || this.disableUserInput;
    },
    mediaMaxSize: {
      get() {
        const bToMb = (b) => (b || 0) / 1024 / 1024;
        return bToMb(this.itemInstance.metadata.mediaMaxSize);
      },
      set(value) {
        const mbToB = (mb) => `${(mb || 0) * 1024 * 1024}`;
        this.setItemMetadata({
          prop: 'mediaMaxSize',
          value: mbToB(value),
        });
      },
    },
  },
  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_ITEM_METADATA`, payload);
      },
      setChatMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_CHAT_METADATA`, payload);
      },
    }),

    setFlow(value) {
      if (!this.itemInstance.name) {
        this.setItemProp({
          prop: 'name',
          value: value.name,
        });
      }
      this.setItemProp({
        prop: 'flow',
        value,
      });
    },

    loadDropdownOptionsList(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../../css/chat-gateways';

</style>
