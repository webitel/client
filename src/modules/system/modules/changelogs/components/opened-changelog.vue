<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :primary-text="saveText"
        :primary-action="save"
        :hide-primary="!hasSaveActionAccess"
        :primary-disabled="disabledSave"
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
import { required } from '@vuelidate/validators';
import General from './opened-changelog-general.vue';
import Logs from '../modules/logs/components/opened-changelog-logs.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-changelog',
  mixins: [openedObjectMixin],
  components: { General, Logs },
  data: () => ({
    namespace: 'system/changelogs',
  }),

  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      name: { required },
    },
  },

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
        },
      ];
      const logs = {
        text: this.$tc('objects.system.changelogs.logs.logs', 2),
        value: 'logs',
      };
      if (this.id) tabs.push(logs);
      return tabs;
    },

    path() {
      const baseUrl = '/system/changelogs';
      return [
        { name: this.$t('objects.system.system') },
        { name: this.$tc('objects.system.changelogs.changelogs', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
