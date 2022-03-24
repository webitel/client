<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat.webchat') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-tags-input
        :add-only-from-autocomplete="false"
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.allowOrigin')"
        :value="itemInstance.metadata.allowOrigin"
        @input="setItemMetadata({ prop: 'allowOrigin', value: $event })"
      ></wt-tags-input>
      <copy-input
        :copy-modifier="modifyUriCopy"
        :disabled="!isUriEditable"
        :label="$t('objects.routing.chatGateways.uri')"
        :v="v.itemInstance.uri"
        :value="itemInstance.uri"
        required
        @input="setItemProp({ prop: 'uri', value: $event })"
      ></copy-input>
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
      <!--      Empty div in order to have correct page design-->
      <div></div>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.handshakeTimeout')"
        :v="v.itemInstance.metadata.handshakeTimeout"
        :value="itemInstance.metadata.handshakeTimeout"
        @input="setItemMetadata({ prop: 'handshakeTimeout', value: $event })"
      ></wt-input>
      <!--      If the input below is not commented - please add an empty <div></div> here in order to have correct page design -->
      <!--      The following input should be commented. Now the maximum message size is default, -->
      <!--      but in future it could be useful allowing admins to set max size of json file-->
      <!--      <wt-input-->
      <!--        :value="itemInstance.metadata.messageSizeMax"-->
      <!--        :label="$t('objects.routing.chatGateways.metadata.messageSize')"-->
      <!--        :disabled="disableUserInput"-->
      <!--        @input="setItemMetadata({ prop: 'messageSizeMax', value: $event })"-->
      <!--      ></wt-input>-->
    </form>
  </section>
</template>

<script>
import path from "path";
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../flow/api/flow';
import uriCopyMixin from '../../mixins/uriCopyMixin';

export default {
  name: 'opened-chat-webchat-general-tab',
  mixins: [openedTabComponentMixin, uriCopyMixin],
  computed: {
    isUriEditable() {
      return !this.disableUserInput && this.$route.path.includes('/new');
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
    modifyUriCopy(value) {
      const base = window.location.origin.replace('http', 'ws');
      return new URL(path.join(process.env.VUE_APP_CHAT_URL, value), base);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/chat-gateways';

</style>
