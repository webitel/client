<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.general') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text :disabled="disableUserInput" :label="$t('objects.name')" :v="v.itemInstance.name"
        :model-value="itemInstance.name" required @update:model-value="setItemProp({ prop: 'name', value: $event })" />
      <generate-value-input :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.customChat.metadata.appSecret')"
        :label-props="{ hint: $t('objects.routing.chatGateways.customChat.appSecretHint'), hintPosition: 'right' }"
        :placeholder="$t('objects.routing.chatGateways.customChat.metadata.appSecret')"
        :v="v.itemInstance.metadata.secret" :value="itemInstance.metadata.secret" required
        @input="setItemMetadata({ prop: 'secret', value: $event })" />
      <copy-input :copy-modifier="modifyUriCopy" :disabled="!isUriEditable"
        :label="$t('objects.routing.chatGateways.uri')" :v="v.itemInstance.uri" :value="itemInstance.uri" required
        @input="setItemProp({ prop: 'uri', value: $event })" />
      <wt-select :disabled="disableUserInput" :label="$t('objects.routing.flow.flow', 1)"
        :search-method="loadDropdownOptionsList" :v="v.itemInstance.flow" :value="itemInstance.flow" required
        @input="setFlow" />
      <wt-input-text :disabled="disableUserInput" :label="$t('objects.routing.chatGateways.customChat.metadata.callback')"
        :v="v.itemInstance.metadata.webhook" :model-value="itemInstance.metadata.webhook" required
        @update:model-value="setItemMetadata({ prop: 'webhook', value: $event })" />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import GenerateValueInput from '../../../../../../app/components/utils/generate-value-input.vue';
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../flow/api/flow';
import uriCopyMixin from '../../mixins/uriCopyMixin';

export default {
  name: 'OpenedChatGatewayCustomChatGeneralTab',
  components: { GenerateValueInput },
  mixins: [openedTabComponentMixin, uriCopyMixin],
  computed: {
    isUriEditable() {
      return !this.disableUserInput && !this.$route.params.id;
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
