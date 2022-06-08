<template>
  <section>
    <header class="content-header">
      <wt-icon icon="messenger" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.messenger.messenger') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.messenger.metadata.clientId')"
        :v="v.itemInstance.metadata.clientId"
        :value="itemInstance.metadata.clientId"
        @input="setItemMetadata({ prop: 'clientId', value: $event })"
      ></wt-input>
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
        :label="$t('objects.routing.chatGateways.messenger.metadata.clientSecret')"
        :v="v.itemInstance.metadata.clientSecret"
        :value="itemInstance.metadata.clientSecret"
        @input="setItemMetadata({ prop: 'clientSecret', value: $event })"
      ></wt-input>
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.routing.flow.flow')"
        :search-method="loadDropdownOptionsList"
        :v="v.itemInstance.flow"
        :value="itemInstance.flow"
        @input="setFlow"
      ></wt-select>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../flow/api/flow';
import uriCopyMixin from '../../mixins/uriCopyMixin';

export default {
  name: 'opened-chat-gateway-messenger-general-tab',
  mixins: [openedTabComponentMixin, uriCopyMixin],
  computed: {
    isUriEditable() {
      return !this.disableUserInput && this.$route.path.includes('/new');
    },
  },
  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_METADATA`, payload);
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
@import '../../css/chat-gateways';
</style>
