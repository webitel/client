<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
    <object-header
      :primary-action="save"
      :primary-disabled="computeDisabled"
      :primary-text="computePrimaryText"
      :hide-primary="!hasSaveActionAccess"
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
import { numeric, required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import General from './opened-team-general.vue';
import Supervisors from '../modules/supervisors/components/opened-team-supervisors.vue';
import Agents from '../modules/agents/components/opened-team-agents.vue';
import Timing from './opened-team-timing.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-team',
  mixins: [openedObjectMixin],
  components: {
    General,
    Supervisors,
    Agents,
    Timing,
  },

  data: () => ({
    namespace: 'ccenter/teams',
  }),

  validations: {
    itemInstance: {
      name: { required },
      strategy: { required },
      maxNoAnswer: { numeric, required },
      wrapUpTime: { numeric, required },
      noAnswerDelayTime: { numeric, required },
      callTimeout: { numeric, required },
    },
  },
  computed: {
    ...mapState('ccenter/teams', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
    }),

    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$t('objects.ccenter.teams.timing'),
        value: 'timing',
      }, {
        text: this.$tc('objects.ccenter.agents.supervisors', 2),
        value: 'supervisors',
      }, {
        text: this.$tc('objects.ccenter.agents.agents', 2),
        value: 'agents',
      }];

      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
      };

      if (this.id) tabs.push(permissions);
      return tabs;
    },

    path() {
      const baseUrl = '/contact-center/teams';
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.teams.teams', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
