<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.routing.chatGateways.templates.templates', 2) }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.title')"
        :model-value="itemInstance.updates.title"
        @update:model-value="setTemplateValue({ prop: 'title', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.join')"
        :model-value="itemInstance.updates.join"
        @update:model-value="setTemplateValue({ prop: 'join', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.close')"
        :model-value="itemInstance.updates.close"
        @update:model-value="setTemplateValue({ prop: 'close', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.left')"
        :model-value="itemInstance.updates.left"
        @update:model-value="setTemplateValue({ prop: 'left', value: $event })"
      />
      <wt-input-text
        v-if="itemInstance.provider !== ChatGatewayProvider.WEBCHAT"
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.filePolicyFail')"
        :model-value="itemInstance.updates.filePolicyFail"
        @update:model-value="setTemplateValue({ prop: 'filePolicyFail', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { ChatGatewayProvider } from '@webitel/ui-sdk/enums';
import { mapActions } from 'vuex';

import { useUserAccessControl } from '../../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedChatGatewayTemplatesTab',
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
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

<style
  lang="scss"
  scoped
>
@use '../../css/chat-gateways';
</style>
