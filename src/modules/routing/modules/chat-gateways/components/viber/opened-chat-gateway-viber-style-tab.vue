<template>
  <section>
    <header class="content-header">
      <wt-icon
        icon="viber"
        icon-prefix="messenger"
        size="sm"
      />
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.routing.chatGateways.viber.style.style') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <div class="opened-chat-gateway-viber-color-picker">
        <wt-label>{{ $t('objects.routing.chatGateways.viber.style.btnBackColor') }}</wt-label>
        <color-picker
          :value="itemInstance.metadata.btnBackColor"
          @input="setItemMetadata({ prop: 'btnBackColor', value: $event.hex })"
        />
        <wt-button
          color="secondary"
          @click="resetBtnColor('btnBackColor')"
        >
          {{ $t('vocabulary.reset') }}
        </wt-button>
      </div>
      <div class="opened-chat-gateway-viber-color-picker">
        <wt-label>{{ $t('objects.routing.chatGateways.viber.style.btnFontColor') }}</wt-label>
        <color-picker
          :value="itemInstance.metadata.btnFontColor"
          @input="setItemMetadata({ prop: 'btnFontColor', value: $event.hex })"
        />
        <wt-button
          color="secondary"
          @click="resetBtnColor('btnFontColor')"
        >
          {{ $t('vocabulary.reset') }}
        </wt-button>
      </div>
    </div>
  </section>
</template>

<script>
import { Chrome } from 'vue-color';
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import viberChatGateway from '../../store/_internals/providers/viberChatGateway';

export default {
  name: 'OpenedChatViberGeneralTab',
  components: {
    ColorPicker: Chrome,
  },
  mixins: [openedTabComponentMixin],
  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_METADATA`, payload);
      },
    }),

    resetBtnColor(prop) {
      const value = viberChatGateway().metadata[prop];
      return this.setItemMetadata({
        prop,
        value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../css/chat-gateways';

.opened-chat-gateway-viber-color-picker {
  .wt-button {
    margin-top: var(--spacing-sm);
  }

  :deep(.vc-chrome-body) {
    background: var(--content-wrapper-color);
  }
}
</style>
