<template>
  <section>
    <header class="content-header">
      <wt-icon
        icon="web-chat"
        icon-prefix="messenger"
        size="sm"
      />
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.routing.chatGateways.webchat.view.view') }}
      </h3>
    </header>
    <section class="webchat-view-main">
      <section class="chat-preview-section">
        <div id="chat-preview" />
        <section class="chat-button-preview-section">
          <div id="chat-button-preview" />
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
          />
          <wt-select
            v-model="selectedPosition"
            :clearable="false"
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.webchat.view.position')"
            :options="positionOptions"
            track-by="name"
            @input="setItemMetadata({ prop: 'position', value: $event.value })"
          />
          <wt-select
            v-model="selectedBorderRadius"
            :clearable="false"
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.webchat.view.borderRadius')"
            :options="borderRadiusOptions"
            track-by="name"
            @input="setItemMetadata({ prop: 'borderRadiusStyle', value: $event.value })"
          />
          <wt-input-text
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.webchat.view.logoUrl')"
            :label-props="{
              hint: $t('objects.routing.chatGateways.webchat.view.logoHint'),
              hintPosition: 'right',
            }"
            :v="v.itemInstance.metadata.view.logoUrl"
            :model-value="itemInstance.metadata.view.logoUrl"
            @update:model-value="setItemMetadata({ prop: 'logoUrl', value: $event })"
          />
          <section>
            <div class="colorpicker-section">
              <wt-label>
                {{ $t('objects.routing.chatGateways.webchat.view.btnColor') }}
              </wt-label>
              <color-picker
                :value="color"
                class="colorpicker"
                @input="setColor"
              />
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

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import webChatPreviewMixin from '../mixins/webChatPreviewMixin';
import webChatViewFormMixin from '../mixins/webChatViewFormMixin';

export default {
  name: 'OpenedChatGatewayWebchatViewTab',
  components: {
    ColorPicker: Chrome,
  },
  mixins: [openedTabComponentMixin, webChatViewFormMixin, webChatPreviewMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_VIEW_METADATA`, payload);
      },
    }),
  },
};
</script>

<style
  lang="scss"
  scoped
>
@use '../../../css/chat-gateways';

.webchat-view-main {
  display: flex;
  width: 50%;
  min-width: 760px;
  gap: var(--spacing-sm);

  .chat-preview-section {
    display: flex;
    flex-basis: max-content;
    flex-direction: column;

    :deep(#wt-omni-widget.wt-omni-widget--position-static) {
      z-index: 1;
    }

    :deep(.chat-button-preview-section) {
      position: relative;
      display: flex;
      align-items: center;
      align-self: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      margin-top: var(--spacing-sm);
      justify-self: center;
    }

    :deep(.chat-button-preview-section::after) {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: '';
      opacity: 0.3;
      background: url('../../../assets/transparent-img.svg') repeat;
    }
  }

  .chat-config-section {
    width: 50%;

    .colorpicker-section {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      grid-gap: var(--spacing-sm);

      .colorpicker {
        width: 100%;

        //:deep(.vc-chrome-body) {
        //  background: var(--content-wrapper-color);
        //}
      }
    }
  }
}
</style>
