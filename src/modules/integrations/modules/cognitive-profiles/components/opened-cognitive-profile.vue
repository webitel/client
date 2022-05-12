<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :primary-text="computePrimaryText"
        :primary-action="save"
        :hide-primary="!hasSaveActionAccess"
        :primary-disabled="computeDisabled"
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
import { required } from 'vuelidate/lib/validators';
import General from './opened-cognitive-profile-general.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-cognitive-profile',
  mixins: [openedObjectMixin],
  components: { General },
  data: () => ({
    namespace: 'integrations/cognitiveProfiles',
  }),

  validations: {
    itemInstance: {
      name: { required },
      service: { required },
      properties: { required },
      provider: { required },
    },
  },

  computed: {
    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }];
      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },

    path() {
      const baseUrl = '/integrations/cognitive-profiles';
      return [
        { name: this.$t('objects.integrations.integrations') },
        { name: this.$tc('objects.integrations.cognitiveProfiles.cognitiveProfiles', 2), route: baseUrl },
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
