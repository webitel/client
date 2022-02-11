<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat') }}</h3>
    </header>
    <form class="object-input-grid object-input-grid__1-col object-input-grid__w50">
      <wt-input
        :disabled="disableUserInput"
        :v="v.itemInstance.metadata.alternativeChannels.whatsapp"
        :value="itemInstance.metadata.alternativeChannels.whatsapp"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../flow/api/flow';
import uriCopyMixin from '../../mixins/uriCopyMixin';

export default {
  name: 'opened-chat-webchat-alternative-channels-tab',
  mixins: [openedTabComponentMixin, uriCopyMixin],
  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_METADATA`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/chat-gateways';

</style>
