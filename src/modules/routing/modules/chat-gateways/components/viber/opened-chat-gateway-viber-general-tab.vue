<template>
  <section>
    <header class="content-header">
      <wt-icon icon="viber" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.viber.viber') }}</h3>
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
        :label="$tc('objects.directory.users.token', 1)"
        :v="v.itemInstance.metadata.token"
        :value="itemInstance.metadata.token"
        @input="setItemMetadata({ prop: 'token', value: $event })"
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
        :label="$t('objects.routing.chatGateways.metadata.botName')"
        :value="itemInstance.metadata.botName"
        @input="setItemMetadata({ prop: 'botName', value: $event })"
      ></wt-input>
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.routing.flow.flow')"
        :search-method="loadDropdownOptionsList"
        :v="v.itemInstance.flow"
        :value="itemInstance.flow"
        @input="setFlow"
      ></wt-select>
      <div></div>
      <div class="opened-chat-gateway-viber-color-picker">
        <wt-label>{{ $t('objects.routing.chatGateways.viber.btnBackColor') }}</wt-label>
        <color-picker
          :value="itemInstance.metadata.btnBackColor"
          @input="setItemMetadata({ prop: 'btnBackColor', value: $event.hex })"
        ></color-picker>
        <wt-button
          color="secondary"
          @click="resetBtnColor('btnBackColor')"
        >{{ $t('vocabulary.reset') }}
        </wt-button>
      </div>
      <div class="opened-chat-gateway-viber-color-picker">
        <wt-label>{{ $t('objects.routing.chatGateways.viber.btnFontColor') }}</wt-label>
        <color-picker
          :value="itemInstance.metadata.btnFontColor"
          @input="setItemMetadata({ prop: 'btnFontColor', value: $event.hex })"
        ></color-picker>
        <wt-button
          color="secondary"
          @click="resetBtnColor('btnFontColor')"
        >{{ $t('vocabulary.reset') }}
        </wt-button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { Chrome } from 'vue-color';
import openedTabComponentMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../flow/api/flow';
import uriCopyMixin from '../../mixins/uriCopyMixin';
import viberChatGateway from '../../store/_internals/providers/viberChatGateway';

export default {
  name: 'opened-chat-viber-general-tab',
  mixins: [openedTabComponentMixin, uriCopyMixin],
  components: {
    ColorPicker: Chrome,
  },
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

    resetBtnColor(prop) {
      const value = viberChatGateway().metadata[prop];
      return this.setItemMetadata({ prop, value });
    },

    loadDropdownOptionsList(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/chat-gateways';

.opened-chat-gateway-viber-color-picker {
  .wt-button {
    margin-top: var(--spacing-sm);
  }
}
</style>
