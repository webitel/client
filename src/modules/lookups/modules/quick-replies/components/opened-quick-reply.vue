<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header :hide-primary="!hasSaveActionAccess" :primary-action="save" :primary-disabled="disabledSave"
        :primary-text="saveText" :secondary-action="close">
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <form class="main-container" @submit.prevent="save">
        <wt-tabs :current="currentTab" :tabs="tabs" />
        <component :is="currentTab.value" :namespace="namespace" :v="v$" />
        <input hidden type="submit"> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import QuickRepliesRouteNames from '../router/_internals/QuickRepliesRouteNames.enum.js';
import General from './opened-quick-reply-general.vue';

export default {
  name: 'OpenedQuickReply',
  components: { General },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'lookups/quickReplies',
    routeName: RouteNames.QUICK_REPLIES,
  }),
  validations: {
    itemInstance: {
      name: { required },
      text: { required },
    },
  },

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
          pathName: QuickRepliesRouteNames.GENERAL
        },
      ];
      return tabs;
    },

    path() {
      const baseUrl = '/lookups/quick-replies';
      return [
        {
          name: this.$t('objects.lookups.lookups'),
        },
        {
          name: this.$t('objects.lookups.quickReplies.quickReplies', 2),
          route: baseUrl,
        },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
        },
      ];
    },
  },
};
</script>

<style scoped></style>
