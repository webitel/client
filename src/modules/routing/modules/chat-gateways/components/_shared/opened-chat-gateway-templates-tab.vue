<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.templates.templates') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.title')"
        :value="itemInstance.updates.title"
        @input="setTemplateValue({ prop: 'title', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.join')"
        :value="itemInstance.updates.join"
        @input="setTemplateValue({ prop: 'join', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.close')"
        :value="itemInstance.updates.close"
        @input="setTemplateValue({ prop: 'close', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.templates.left')"
        :value="itemInstance.updates.left"
        @input="setTemplateValue({ prop: 'left', value: $event })"
      ></wt-input>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-chat-gateway-templates-tab',
  mixins: [openedTabComponentMixin],
  data: () => ({}),
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
@import '../../css/chat-gateways';
</style>
