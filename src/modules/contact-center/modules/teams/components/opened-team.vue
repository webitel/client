<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
    <wt-page-header
      :primary-action="save"
      :primary-disabled="disabledSave"
      :primary-text="saveText"
      :hide-primary="!hasSaveActionAccess"
      :secondary-action="close"
    >
      <wt-headline-nav :path="path"></wt-headline-nav>
    </wt-page-header>
    </template>
    <template v-slot:main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :v="v$"
          :namespace="namespace"
        ></component>
        <input type="submit" hidden> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { numeric, required } from '@vuelidate/validators';
import General from './opened-team-general.vue';
import Supervisors from '../modules/supervisors/components/opened-team-supervisors.vue';
import Agents from '../modules/agents/components/opened-team-agents.vue';
import Parameters from './opened-team-parameters.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-team',
  mixins: [openedObjectMixin],
  components: {
    General,
    Supervisors,
    Agents,
    Parameters,
  },

  data: () => ({
    namespace: 'ccenter/teams',
  }),

  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      name: { required },
      strategy: { required },
      maxNoAnswer: { numeric, required },
      wrapUpTime: { numeric, required },
      noAnswerDelayTime: { numeric, required },
      callTimeout: { numeric, required },
      inviteChatTimeout: { numeric, required },
    },
  },
  computed: {
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

      if (this.id) tabs.push(this.permissionsTab);
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
