<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat.webchat') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.readTimeout')"
        :v="v.itemInstance.metadata.readTimeout"
        :value="itemInstance.metadata.readTimeout"
        @input="setItemMetadata({ prop: 'readTimeout', value: $event })"
      ></wt-input>
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.routing.flow.flow')"
        :search-method="loadDropdownOptionsList"
        :v="v.itemInstance.flow"
        :value="itemInstance.flow"
        @input="setFlow"
      ></wt-select>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.writeTimeout')"
        :v="v.itemInstance.metadata.writeTimeout"
        :value="itemInstance.metadata.writeTimeout"
        @input="setItemMetadata({ prop: 'writeTimeout', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.handshakeTimeout')"
        :v="v.itemInstance.metadata.handshakeTimeout"
        :value="itemInstance.metadata.handshakeTimeout"
        @input="setItemMetadata({ prop: 'handshakeTimeout', value: $event })"
      ></wt-input>
      <wt-input
        v-model="mediaMaxSize"
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.webchat.metadata.mediaMaxSize')"
        type="number"
      ></wt-input>
      <wt-switcher
        :label="this.$t('objects.routing.chatGateways.webchat.view.openTimeout')"
        :value="itemInstance.metadata.timeoutIsActive"
        @change="setItemMetadata({ prop: 'timeoutIsActive', value: $event })"
      ></wt-switcher>
      <wt-input
        :disabled="disableOpenTimeout"
        :label="this.$t('date.sec')"
        :v="v.itemInstance.metadata.openTimeout"
        :value="itemInstance.metadata.openTimeout"
        @input="setItemMetadata({ prop: 'openTimeout', value: $event })"
      ></wt-input>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../../flow/api/flow';

export default {
  name: 'opened-chat-webchat-general-tab',
  mixins: [openedTabComponentMixin],
  computed: {
    disableOpenTimeout() {
      return !this.itemInstance.metadata.timeoutIsActive || this.disableUserInput;
    },
    mediaMaxSize: {
      get() {
        const bToMb = (b) => (b || 0) / 1024 / 1024;
        return bToMb(this.itemInstance.metadata.mediaMaxSize);
      },
      set(value) {
        const mbToB = (mb) => `${(mb || 0) * 1024 * 1024}`;
        this.setItemMetadata({ prop: 'mediaMaxSize', value: mbToB(value) });
      },
    },
  },
  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_ITEM_METADATA`, payload);
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
@import '../../../css/chat-gateways';

</style>
