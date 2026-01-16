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
import { maxValue, minValue, required, requiredIf } from '@vuelidate/validators';
import { EngineEmailAuthType } from 'webitel-sdk';

import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import EmailProfilesRouteNames from '../router/_internals/EmailProfilesRouteNames.enum.js';
import General from './opened-email-profile-general.vue';

export default {
  name: 'OpenedEmailProfile',
  components: { General },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'integrations/emailProfiles',
    routeName: RouteNames.EMAIL_PROFILES,
  }),
  validations() {
    const itemInstance = {
      name: { required },
      schema: { required },
      imapHost: { required },
      smtpHost: { required },
      fetchInterval: { required },
      imapPort: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(65535),
      },
      smtpPort: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(65535),
      },
      login: { required },
      mailbox: { required },
      authType: { required },
      password: {
        required: requiredIf(!this.isOauth2AuthType && !this.id),
      },
      params: {
        oauth2: {
          clientId: {
            required: requiredIf(this.isOauth2AuthType),
          },
          clientSecret: {
            required: requiredIf(this.isOauth2AuthType),
          },
          redirectUrl: {
            required: requiredIf(this.isOauth2AuthType),
          },
        },
      },
    };
    return { itemInstance };
  },

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
          pathName: EmailProfilesRouteNames.GENERAL,
        },
      ];
      // if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },
    isOauth2AuthType() {
      return this.itemInstance.authType === EngineEmailAuthType.OAuth2;
    },

    path() {
      const baseUrl = '/integrations/email-profiles';
      return [
        {
          name: this.$t('objects.integrations.integrations'),
        },
        {
          name: this.$t('objects.integrations.emailProfiles.emailProfiles', 2),
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
  },
};
</script>

<style scoped></style>
