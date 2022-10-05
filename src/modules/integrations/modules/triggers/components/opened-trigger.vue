<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :primary-text="saveText"
        :primary-action="save"
        :hide-primary="!hasSaveActionAccess"
        :primary-disabled="disabledSave"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
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
          :v="$v"
          :namespace="namespace"
        ></component>
        <input type="submit" hidden> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import General from './opened-trigger-general.vue';
import Variables from './opened-trigger-variables.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-trigger',
  mixins: [openedObjectMixin],
  components: {
    General,
    Variables,
  },
  data: () => ({
    namespace: 'integrations/triggers',
  }),

  validations: {
    itemInstance: {
      name: { required },
      schema: { required },
      timezone: { required },
    },
  },

  computed: {
    tabs() {
      const general = {
        text: this.$t('objects.general'),
        value: 'general',
      };
      const variables = {
        text: this.$tc('vocabulary.variables', 2),
        value: 'variables',
      };

      const tabs = [
        general,
        variables,
      ];

      return tabs;
    },

    path() {
      const baseUrl = '/integrations/triggers';
      return [
        { name: this.$t('objects.integrations.integrations') },
        { name: this.$tc('objects.integrations.triggers.triggers', 2), route: baseUrl },
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
