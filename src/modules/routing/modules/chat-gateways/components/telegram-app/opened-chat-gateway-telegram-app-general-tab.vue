<template>
  <section>
    <header class="content-header">
      <wt-icon icon="telegram" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">
        {{ $t('objects.routing.chatGateways.telegramBot.telegramBot') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.telegramApp.metadata.apiId')"
        :v="v.itemInstance.metadata.apiId"
        :value="itemInstance.metadata.apiId"
        type="number"
        @input="setItemMetadata({ prop: 'apiId', value: $event })"
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
        :label="$t('objects.routing.chatGateways.telegramApp.metadata.apiHash')"
        :v="v.itemInstance.metadata.apiHash"
        :value="itemInstance.metadata.apiHash"
        @input="setItemMetadata({ prop: 'apiHash', value: $event })"
      ></wt-input>
      <div></div>
      <telegram-app-button
        v-if="itemInstance.id"
        :uri="itemInstance.uri"
      ></telegram-app-button>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../flow/api/flow';
import uriCopyMixin from '../../mixins/uriCopyMixin';
import TelegramAppButton from './telegram-app-button.vue';

export default {
  name: 'opened-chat-telegram-app-general-tab',
  mixins: [openedTabComponentMixin, uriCopyMixin],
  components: { TelegramAppButton },
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

.object-input-grid .telegram-app-button {
  margin: auto;
}
</style>
