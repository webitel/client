<template>
  <section>
    <header class="content-header">
      <wt-icon
        icon="telegram"
        icon-prefix="messenger"
        size="sm"
      />
      <h3 class="content-title">
        {{ $t('objects.routing.chatGateways.telegramApp.telegramApp') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.telegramApp.metadata.apiId')"
        :v="v.itemInstance.metadata.apiId"
        :value="itemInstance.metadata.apiId"
        type="number"
        @input="setItemMetadata({ prop: 'apiId', value: $event })"
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
        :label="$t('objects.routing.chatGateways.telegramApp.metadata.apiHash')"
        :v="v.itemInstance.metadata.apiHash"
        :value="itemInstance.metadata.apiHash"
        @input="setItemMetadata({ prop: 'apiHash', value: $event })"
      />
      <div />
      <telegram-app-button
        v-if="itemInstance.id"
        :uri="itemInstance.uri"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../flow/api/flow';
import uriCopyMixin from '../../mixins/uriCopyMixin';
import TelegramAppButton from './telegram-app-button.vue';

export default {
  name: 'OpenedChatTelegramAppGeneralTab',
  components: { TelegramAppButton },
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

.object-input-grid .telegram-app-button {
  margin: auto;
}
</style>
