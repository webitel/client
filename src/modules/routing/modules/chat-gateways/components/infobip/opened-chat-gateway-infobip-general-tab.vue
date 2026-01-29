<template>
  <section>
    <header class="content-header">
      <wt-icon
        icon="infobip"
        icon-prefix="messenger"
        size="sm"
      />
      <h3 class="content-title">
        {{ $t('objects.routing.chatGateways.infobip.infobip') }}
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
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.apiKey')"
        :v="v.itemInstance.metadata.apiKey"
        :model-value="itemInstance.metadata.apiKey"
        @update:model-value="setItemMetadata({ prop: 'apiKey', value: $event })"
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
      <!--      <wt-input-->
      <!--        :disabled="disableUserInput"-->
      <!--        :label="$t('objects.routing.chatGateways.metadata.number')"-->
      <!--        :value="itemInstance.metadata.number"-->
      <!--        @input="setItemMetadata({ prop: 'number', value: $event })"-->
      <!--      ></wt-input>-->
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.routing.flow.flow', 1)"
        :search-method="loadDropdownOptionsList"
        :v="v.itemInstance.flow"
        :value="itemInstance.flow"
        @input="setFlow"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.metadata.baseUrl')"
        :v="v.itemInstance.metadata.url"
        :model-value="itemInstance.metadata.url"
        @update:model-value="setItemMetadata({ prop: 'url', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import { useUserAccessControl } from '../../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../flow/api/flow';
import uriCopyMixin from '../../mixins/uriCopyMixin';

export default {
  name: 'OpenedChatGatewayInfobipGeneralTab',
  mixins: [openedTabComponentMixin, uriCopyMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
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

    loadDropdownOptionsList(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
@use '../../css/chat-gateways';
</style>
