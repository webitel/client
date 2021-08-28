<template>
  <section>
    <header class="content-header">
      <wt-icon icon-prefix="messenger" icon="viber" sm></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.viber') }}</h3>
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
        :value="itemInstance.metadata.token"
        :v="v.itemInstance.metadata.token"
        :label="$tc('objects.directory.users.token', 1)"
        :disabled="disableUserInput"
        @input="setItemMetadata({ prop: 'token', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.uri"
        :v="v.itemInstance.uri"
        :label="$t('objects.routing.chatGateways.uri')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'uri', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.metadata.botName"
        :label="$t('objects.routing.chatGateways.metadata.botName')"
        :disabled="disableUserInput"
        @input="setItemMetadata({ prop: 'botName', value: $event })"
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
        :value="itemInstance.metadata.eventTypes"
        :label="$t('objects.routing.chatGateways.metadata.eventTypes')"
        :disabled="disableUserInput"
        @input="setItemMetadata({ prop: 'eventTypes', value: $event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { getFlowList } from '../../flow/components/flow';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-chat-viber-general-tab',
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
@import "../chat-gateways";
</style>
