<template>
  <section>
    <header class="content-header">
      <wt-icon icon="meta" size="md" />
      <h3 class="content-title">
        {{ $t('objects.routing.chatGateways.messenger.meta') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text :disabled="disableUserInput" :label="$t('objects.name')" :v="v.itemInstance.name"
        :model-value="itemInstance.name" @update:model-value="setItemProp({ prop: 'name', value: $event })" />
      <wt-input-text :disabled="disableUserInput" :label="$t('objects.routing.chatGateways.messenger.metadata.clientId')"
        :v="v.itemInstance.metadata.clientId" :model-value="itemInstance.metadata.clientId"
        @update:model-value="setItemMetadata({ prop: 'clientId', value: $event })" />
      <copy-input :copy-modifier="modifyUriCopy" :disabled="!isUriEditable"
        :label="$t('objects.routing.chatGateways.uri')" :v="v.itemInstance.uri" :value="itemInstance.uri" required
        @input="setItemProp({ prop: 'uri', value: $event })" />
      <wt-input-text :disabled="disableUserInput" :label="$t('objects.routing.chatGateways.messenger.metadata.clientSecret')"
        :v="v.itemInstance.metadata.clientSecret" :model-value="itemInstance.metadata.clientSecret"
        @update:model-value="setItemMetadata({ prop: 'clientSecret', value: $event })" />
      <wt-select :disabled="disableUserInput" :label="$t('objects.routing.flow.flow', 1)"
        :search-method="loadDropdownOptionsList" :v="v.itemInstance.flow" :value="itemInstance.flow" @input="setFlow" />
      <wt-input-text :disabled="disableUserInput" :label="$t('objects.routing.chatGateways.messenger.metadata.apiVersion')"
        :label-props="{ hint: $t('objects.routing.chatGateways.messenger.metadata.apiVersionHint') }"
        :v="v.itemInstance.metadata.version" :model-value="itemInstance.metadata?.version || ''"
        @update:model-value="setItemMetadata({ prop: 'version', value: $event })" />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../flow/api/flow';
import uriCopyMixin from '../../mixins/uriCopyMixin';

export default {
  name: 'OpenedChatGatewayMessengerGeneralTab',
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
@use '../../css/chat-gateways';
</style>
