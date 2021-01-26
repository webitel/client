<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :primary-action="save"
        :primary-disabled="computeDisabled"
        :primary-text="computePrimaryText"
        :secondary-action="close"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template slot="main">
      <div class="main-container">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        >
        </wt-tabs>
        <component
          :is="`${$options.name}-${currentTab.value}`"
          :v="$v"
          :namespace="namespace"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import required from 'vuelidate/src/validators/required';
import OpenedQueueMemberGeneral from './opened-queue-member-general.vue';
import OpenedQueueMemberCommunication from './opened-queue-member-communication.vue';
import OpenedQueueMemberVariables from './opened-queue-member-variables.vue';
import { requiredArrayValue } from '../../../utils/validators';
import openedObjectMixin from '../../../mixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-queue-member',
  mixins: [openedObjectMixin],
  components: {
    OpenedQueueMemberGeneral,
    OpenedQueueMemberCommunication,
    OpenedQueueMemberVariables,
  },
  data: () => ({
    namespace: 'ccenter/queues/members',
  }),

  validations: {
    itemInstance: {
      name: { required },
      communications: { requiredArrayValue },
    },
  },

  computed: {
    ...mapState('ccenter/queues/members', {
      id: (state) => state.itemId,
      parentQueue: (state) => state.parentQueue,
      itemInstance: (state) => state.itemInstance,
    }),

    tabs() {
      return [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$tc('objects.lookups.communications.communications', 1),
        value: 'communication',
      }, {
        text: this.$tc('objects.ccenter.queues.variables', 2),
        value: 'variables',
      }];
    },

    path() {
      const baseUrl = `/contact-center/queues/${this.parentQueue.id}/members`;
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.members.members', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },

  methods: {
    ...mapActions('ccenter/queues/members', {
      setParentId: 'SET_PARENT_ITEM_ID',
    }),
    async loadPageData() {
      await Promise.all([
        this.setParentId(this.$route.params.queueId),
        this.setId(this.$route.params.id),
      ]);
      return this.loadItem();
    },
  },
};
</script>

<style scoped>

</style>
