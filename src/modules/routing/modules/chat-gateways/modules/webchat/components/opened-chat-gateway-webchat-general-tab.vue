<template>
  <section>
    <header class="content-header">
      <wt-icon
        icon="web-chat"
        icon-prefix="messenger"
        size="sm"
      />
      <h3 class="content-title">
        {{ $t('objects.general') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :model-value="itemInstance.name"
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-tags-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.allowOrigin')"
        :value="itemInstance.metadata.allowOrigin"
        taggable
        @input="setItemMetadata({ prop: 'allowOrigin', value: $event })"
      />
      <copy-input
        :copy-modifier="modifyUriCopy"
        :disabled="!isUriEditable"
        :label="$t('objects.routing.chatGateways.uri')"
        :v="v.itemInstance.uri"
        :value="itemInstance.uri"
        required
        @input="setItemProp({ prop: 'uri', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import path from 'path';
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import uriCopyMixin from '../../../mixins/uriCopyMixin';

export default {
  name: 'OpenedChatWebchatGeneralTab',
  mixins: [openedTabComponentMixin, uriCopyMixin],
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
    modifyUriCopy(value) {
      const base = window.location.origin.replace('http', 'ws');
      return new URL(path.join(import.meta.env.VITE_CHAT_URL, value), base);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../../css/chat-gateways';

</style>
