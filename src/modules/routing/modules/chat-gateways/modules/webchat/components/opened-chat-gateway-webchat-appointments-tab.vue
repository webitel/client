<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat.webchat') }}</h3>
    </header>
    <div class="object-input-grid">
<!--      <wt-switcher-->
<!--        :value=""-->
<!--      ></wt-switcher>-->
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-chat-gateway-webchat-appointments-tab',
  mixins: [openedTabComponentMixin],
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
@import '../../../css/chat-gateways';

</style>
