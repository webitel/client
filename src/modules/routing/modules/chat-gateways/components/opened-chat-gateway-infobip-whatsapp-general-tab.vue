<template>
  <section>
    <header class="content-header">
      <wt-icon icon-prefix="messenger" icon="whatsapp" sm></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.whatsapp') }}</h3>
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
        :value="itemInstance.metadata.apiKey"
        :v="v.itemInstance.metadata.apiKey"
        :label="$t('objects.routing.chatGateways.metadata.apiKey')"
        :disabled="disableUserInput"
        @input="setItemMetadata({ prop: 'apiKey', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.uri"
        :v="v.itemInstance.uri"
        :label="$t('objects.routing.chatGateways.uri')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'uri', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.number"
        :v="v.itemInstance.number"
        :label="$t('objects.routing.chatGateways.metadata.number')"
        :disabled="disableUserInput"
        @input="setItemMetadata({ prop: 'number', value: $event })"
      ></wt-input>
      <wt-select
        :value="itemInstance.flow"
        :v="v.itemInstance.flow"
        :label="$t('objects.routing.flow.flow')"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'flow', value: $event })"
      ></wt-select>
      <wt-input
        :value="itemInstance.url"
        :v="v.itemInstance.url"
        :label="$t('objects.routing.chatGateways.metadata.baseUrl')"
        :disabled="disableUserInput"
        @input="setItemMetadata({ prop: 'url', value: $event })"
      ></wt-input>
      <!--      Empty div in order to have correct page design--> <div></div>
      <wt-input
        :value="itemInstance.scenarioKey"
        :label="$t('objects.routing.chatGateways.metadata.scenarioKey')"
        :disabled="disableUserInput"
        @input="setItemMetadata({ prop: 'scenarioKey', value: $event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { getFlowList } from '../../flow/components/flow';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-chat-gateway-infobip-whatsapp-general-tab',
  mixins: [openedTabComponentMixin],
  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getFlowList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_METADATA`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../css/chat-gateways";
</style>
