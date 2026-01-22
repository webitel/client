<template>
  <section>
    <header class="content-header">
      <wt-icon icon="viber" icon-prefix="messenger" size="sm" />
      <h3 class="content-title">
        {{ $t('objects.routing.chatGateways.viber.viber') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input :disabled="disableUserInput" :label="$t('objects.name')" :v="v.itemInstance.name"
        :value="itemInstance.name" @input="setItemProp({ prop: 'name', value: $event })" />
      <wt-input :disabled="disableUserInput" :label="$t('objects.directory.users.token', 1)"
        :v="v.itemInstance.metadata.token" :value="itemInstance.metadata.token"
        @input="setItemMetadata({ prop: 'token', value: $event })" />
      <copy-input :copy-modifier="modifyUriCopy" :disabled="!isUriEditable"
        :label="$t('objects.routing.chatGateways.uri')" :v="v.itemInstance.uri" :value="itemInstance.uri" required
        @input="setItemProp({ prop: 'uri', value: $event })" />
      <wt-input :disabled="disableUserInput" :label="$t('objects.routing.chatGateways.metadata.botName')"
        :value="itemInstance.metadata.botName" @input="setItemMetadata({ prop: 'botName', value: $event })" />
      <wt-select :disabled="disableUserInput" :label="$t('objects.routing.flow.flow', 1)"
        :search-method="loadDropdownOptionsList" :v="v.itemInstance.flow" :value="itemInstance.flow" @input="setFlow" />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../flow/api/flow';
import uriCopyMixin from '../../mixins/uriCopyMixin';

export default {
  name: 'OpenedChatViberGeneralTab',
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
