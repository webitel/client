<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import ChatplanRoutesName from '../router/_internals/ChatplanRouteNames.enum.js';
import General from './opened-chatplan-general.vue';

export default {
  name: 'OpenedChatplan',
  components: { General },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'routing/chatplan',
    routeName: RouteNames.CHATPLAN,
  }),
  validations: {
    itemInstance: {
      name: { required },
      schema: { required },
    },
  },

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
          pathName: ChatplanRoutesName.GENERAL,
        },
      ];
      return tabs;
    },
    path() {
      const baseUrl = '/routing/chatplan';
      return [
        {
          name: this.$t('objects.routing.routing'),
        },
        {
          name: this.$tc('objects.routing.chatplan.chatplan', 1),
          route: baseUrl,
        },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: {
            name: this.currentTab.pathName,
            query: this.$route.query,
          },
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
