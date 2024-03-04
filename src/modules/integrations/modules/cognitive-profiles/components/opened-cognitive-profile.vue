<template>
  <wt-page-wrapper
    v-if="showPage"
    :actions-panel="false"
  >
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
          v-model="currentTab"
          :tabs="tabs"
        />
        <component
          :is="currentTab && currentTab.value"
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
import deepmerge from 'deepmerge';
import { StorageProviderType } from 'webitel-sdk';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import Google from './google/opened-cognitive-profile-google.vue';
import Microsoft from './microsoft/opened-cognitive-profile-microsoft.vue';
import Elevenlabs from './elevenlabs/opened-cognitive-profile-elevenlabs.vue';

export default {
  name: 'OpenedCognitiveProfile',
  components: {
    Microsoft,
    Google,
    Elevenlabs,
  },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'integrations/cognitiveProfiles',
  }),
  validations() {
    const defaults = {
      itemInstance: {
        name: { required },
        service: { required },
        provider: { required },
      },
    };
    switch (this.provider) {
      case StorageProviderType.Microsoft:
        return deepmerge(defaults, {
          itemInstance: {
            properties: {
              key: { required },
              region: { required },
            },
          },
        });
      case StorageProviderType.Google:
        return deepmerge(defaults, {
          itemInstance: {
            properties: {
              key: { required },
            },
          },
        });
      case StorageProviderType.Elevenlabs:
        return deepmerge(defaults, {
          itemInstance: {
            properties: {
              key: { required },
            },
          },
        });
      default:
        return defaults;
    }
  },

  computed: {
    showPage() {
      return this.provider !== null;
    },
    provider() {
      return this.itemInstance.provider;
    },
    tabs() {
      const microsoft = {
        text: StorageProviderType.Microsoft,
        value: 'Microsoft',
      };

      const google = {
        text: StorageProviderType.Google,
        value: 'Google',
      };

      const elevenlabs = {
        text: StorageProviderType.Elevenlabs,
        value: 'Elevenlabs',
      };

      const tabs = [];
      if (this.provider === StorageProviderType.Microsoft) tabs.push(microsoft);
      else if (this.provider === StorageProviderType.Google) tabs.push(google);
      else if (this.provider === StorageProviderType.Elevenlabs) tabs.push(elevenlabs);
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
  methods: {
    async loadPageData() {
      await this.setId(this.$route.params.id);
      await this.loadItem(this.$route.query.type);
      this.setInitialTab();
    },
  },
};
</script>

<style scoped>

</style>
