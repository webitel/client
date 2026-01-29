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
        <template #primary-action>
          <wt-button-select
            :color="disabledSave ? 'secondary' : 'primary'"
            :options="saveOptions"
            @click="save"
            @click:option="({ callback }) => callback()"
          >
            {{ $t('objects.save') }}
          </wt-button-select>
        </template>
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <div class="main-container">
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum.js';
import { requiredArrayValue } from '../../../../../../../app/utils/validators';
import QueuesRoutesName from '../../../router/_internals/QueuesRoutesName.enum.js';
import Communication from './communications/opened-queue-member-communication.vue';
import General from './opened-queue-member-general.vue';
import Variables from './opened-queue-member-variables.vue';

export default {
  name: 'OpenedQueueMember',
  components: {
    General,
    Communication,
    Variables,
  },
  mixins: [openedObjectMixin],

  setup: () => {
    const v$ = useVuelidate();
    const { hasUpdateAccess } = useUserAccessControl();
    return {
      v$,
      hasUpdateAccess,
    };
  },
  data: () => ({
    namespace: 'ccenter/queues/members',
    routeName: RouteNames.MEMBERS,
  }),
  validations: {
    itemInstance: {
      name: { required },
      communications: {
        requiredArrayValue,
      },
    },
  },

  computed: {
    ...mapState({
      parentQueue(state) {
        return getNamespacedState(state, this.namespace).parentQueue;
      },
    }),
    tabs() {
      return [
        {
          text: this.$t('objects.general'),
          value: 'general',
          pathName: QueuesRoutesName.MEMBERS_GENERAL,
        }, {
          text: this.$t('objects.lookups.communications.communications', 1),
          value: 'communication',
          pathName: QueuesRoutesName.MEMBERS_COMMUNICATION_TYPE,
        }, {
          text: this.$t('objects.ccenter.queues.variables', 2),
          value: 'variables',
          pathName: QueuesRoutesName.MEMBERS_VARIABLES,
        },
      ];
    },

    path() {
      const baseUrl = `/contact-center/queues/${this.parentQueue.id}/members`;
      return [
        {
          name: this.$t('objects.ccenter.ccenter'),
        },
        {
          name: this.$t('objects.ccenter.members.members', 2),
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
    hasSaveActionAccess() {
      return this.hasUpdateAccess;
    },
    saveOptions() {
      const saveAsNew = {
        text: this.$t('reusable.saveAs'),
        callback: this.saveAs,
      };
      return [saveAsNew];
    },
  },

  methods: {
    ...mapActions({
      setParentId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_PARENT_ITEM_ID`, payload);
      },
      setItemProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROPERTY`, payload);
      },
    }),
    async loadPageData() {
      await Promise.all([
        this.setParentId(this.$route.params.queueId),
        this.setId(this.$route.params.id),
      ]);
      return this.loadItem();
    },
    saveAs() {
      this.setItemProp({
        prop: 'endCause',
        value: '',
      });
      this.setItemProp({
        prop: 'stopCause',
        value: '',
      });
      this.setItemProp({
        prop: 'attempts',
        value: 0,
      });
      this.setItemProp({
        prop: 'id',
        value: '',
      });
      this.setId(null);
      this.save();
    },
  },
};
</script>

<style scoped></style>
