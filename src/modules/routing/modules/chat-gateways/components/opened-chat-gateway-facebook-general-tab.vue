<template>
  <section>
    <header class="content-header">
      <wt-icon icon-prefix="messenger" icon="facebook" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.facebook') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.metadata.AccessToken"
        :v="v.itemInstance.metadata.AccessToken"
        :label="$t('objects.routing.chatGateways.metadata.accessToken')"
        :disabled="disableUserInput"
        @input="setItemMetadata({ prop: 'AccessToken', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.uri"
        :v="v.itemInstance.uri"
        :label="$t('objects.routing.chatGateways.uri')"
        :disabled="!isUriEditable"
        @input="setItemProp({ prop: 'uri', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.metadata.VerifyToken"
        :v="v.itemInstance.metadata.VerifyToken"
        :label="$t('objects.routing.chatGateways.metadata.verifyToken')"
        :disabled="disableUserInput"
        @input="setItemMetadata({ prop: 'VerifyToken', value: $event })"
      ></wt-input>
      <wt-select
        :value="itemInstance.flow"
        :v="v.itemInstance.flow"
        :label="$t('objects.routing.flow.flow')"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setFlow"
      ></wt-select>
      <wt-input
        :value="itemInstance.metadata.url"
        :v="v.itemInstance.metadata.url"
        :label="$t('objects.routing.chatGateways.metadata.facebookApiUrl')"
        :disabled="disableUserInput"
        @input="setItemMetadata({ prop: 'url', value: $event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { getFlowList } from '../../flow/components/flow';

export default {
  name: 'opened-chat-gateway-facebook-general-tab',
  mixins: [openedTabComponentMixin],
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
        this.setItemProp({ prop: 'name', value: value.name });
      }
      this.setItemProp({ prop: 'flow', value });
    },

    async loadDropdownOptionsList(search) {
      const response = await getFlowList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/chat-gateways";
</style>
