<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat.webchat') }}</h3>
    </header>
    <section class="webchat-view-main">
      <section class="chat-preview-section">
        <div id="chat-preview"></div>
        <section class="chat-button-preview-section">
          <div id="chat-button-preview"></div>
        </section>
      </section>
      <section class="chat-config-section">
        <div class="object-input-grid object-input-grid__1-col">
          <wt-select
            v-model="selectedLanguage"
            :clearable="false"
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.webchat.view.language')"
            :options="languages"
            track-by="name"
            @input="setItemMetadata({ prop: 'lang', value: $event.value })"
          ></wt-select>
          <wt-select
            v-model="selectedPosition"
            :clearable="false"
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.webchat.view.position')"
            :options="positionOptions"
            track-by="name"
            @input="setItemMetadata({ prop: 'position', value: $event.value })"
          ></wt-select>
          <wt-select
            v-model="selectedBorderRadius"
            :clearable="false"
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.webchat.view.borderRadius')"
            :options="borderRadiusOptions"
            track-by="name"
            @input="setItemMetadata({ prop: 'borderRadiusStyle', value: $event.value })"
          ></wt-select>
          <wt-input
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.webchat.view.logoUrl')"
            :label-props="{
              hint: this.$t('objects.routing.chatGateways.webchat.view.logoHint'),
              hintPosition: 'right',
             }"
            :v="v.itemInstance.metadata.logoUrl"
            :value="itemInstance.metadata.logoUrl"
            @input="setItemMetadata({ prop: 'logoUrl', value: $event })"
          ></wt-input>
          <section class="switcher-section">
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
          </section>
          <section>
            <div class="colorpicker-section">
              <wt-label>
                {{ this.$t('objects.routing.chatGateways.webchat.view.btnColor') }}
              </wt-label>
              <color-picker :value="color" class="colorpicker" @input="setColor"/>
            </div>
          </section>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { Chrome } from 'vue-color';
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import webChatPreviewMixin from '../../mixins/webChatPreviewMixin';
import webChatViewFormMixin from '../../mixins/webChatViewFormMixin';

export default {
  name: 'opened-chat-gateway-webchat-view-tab',
  mixins: [openedTabComponentMixin, webChatViewFormMixin, webChatPreviewMixin],
  components: {
    ColorPicker: Chrome,
  },
  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_ITEM_METADATA`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/chat-gateways';

.webchat-view-main {
  width: 50%;
  min-width: 760px;
  display: flex;
  gap: var(--spacing-sm);

  .chat-preview-section ::v-deep {
    flex-basis: max-content;
    display: flex;
    flex-direction: column;

    #wt-omni-widget.wt-omni-widget--position-static {
      z-index: 1;
    }

    .chat-button-preview-section {
      align-self: center;
      justify-self: center;
      position: relative;
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: var(--spacing-sm);
    }

    .chat-button-preview-section::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: url('../../assets/transparent-img.svg') repeat;
      opacity: 0.3;
    }
  }

  .chat-config-section {
    .switcher-section {
      display: flex;
      gap: var(--spacing-sm);
      flex-shrink: 0;
      align-items: center;
    }

    .colorpicker-section {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      grid-gap: var(--spacing-sm);

      .colorpicker {
        width: 100%;
      }
    }
  }
}

</style>
