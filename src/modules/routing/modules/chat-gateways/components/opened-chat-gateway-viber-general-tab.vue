<template>
  <section>
    <header class="content-header">
      <wt-icon icon-prefix="messenger" icon="viber" size="sm"></wt-icon>
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
        :disabled="isEditTab"
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
        @input="setFlow"
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
  computed: {
    isEditTab() {
      return !this.$route.path.includes('/new');
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
      };
      this.setItemProp({ prop: 'flow', value: value});
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
