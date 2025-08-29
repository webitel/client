<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.routing.chatGateways.templates.templates', 2) }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.title')"
        :value="itemInstance.updates.title"
        @input="setTemplateValue({ prop: 'title', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.join')"
        :value="itemInstance.updates.join"
        @input="setTemplateValue({ prop: 'join', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.close')"
        :value="itemInstance.updates.close"
        @input="setTemplateValue({ prop: 'close', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.left')"
        :value="itemInstance.updates.left"
        @input="setTemplateValue({ prop: 'left', value: $event })"
      />
      <wt-input
        v-if="itemInstance.provider !== ChatGatewayProvider.WEBCHAT"
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.filePolicyFail')"
        :value="itemInstance.updates.filePolicyFail"
        @input="setTemplateValue({ prop: 'filePolicyFail', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { ChatGatewayProvider } from '@webitel/ui-sdk/enums';
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedChatGatewayTemplatesTab',
  mixins: [openedTabComponentMixin],
  data: () => ({
    ChatGatewayProvider,
  }),
  methods: {
    ...mapActions({
      setTemplateValue(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_TEMPLATE`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
@use '../../css/chat-gateways';
</style>
