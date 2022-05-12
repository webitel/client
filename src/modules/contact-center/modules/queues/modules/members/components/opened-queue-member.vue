<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :primary-action="save"
        :primary-disabled="computeDisabled"
        :hide-primary="!hasSaveActionAccess"
        :primary-text="computePrimaryText"
        :secondary-action="close"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template v-slot:main>
      <div class="main-container">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :v="$v"
          :namespace="namespace"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import required from 'vuelidate/src/validators/required';
import General from './opened-queue-member-general.vue';
import Communication from './communications/opened-queue-member-communication.vue';
import Variables from './opened-queue-member-variables.vue';
import { requiredArrayValue } from '../../../../../../../app/utils/validators';
import openedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-queue-member',
  mixins: [openedObjectMixin],
  components: {
    General,
    Communication,
    Variables,
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
    ...mapState({
      parentQueue(state) {
        return getNamespacedState(state, this.namespace).parentQueue;
      },
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
    hasSaveActionAccess() {
      return this.hasEditAccess;
    },
  },

  methods: {
    ...mapActions({
      setParentId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_PARENT_ITEM_ID`, payload);
      },
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
