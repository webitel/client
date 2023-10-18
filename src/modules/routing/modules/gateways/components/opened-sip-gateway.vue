<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
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
          :namespace="namespace"
          :v="v$"
        ></component>
        <input hidden type="submit"> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>

import { useVuelidate } from '@vuelidate/core';
import { helpers, maxValue, minValue, numeric, required } from '@vuelidate/validators';
import { mapActions } from 'vuex';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import { gatewayHostValidator, ipValidator, sipAccountValidator } from '../../../../../app/utils/validators';
import RegisterGeneral from './opened-register-sip-gateway-general.vue';
import TrunkingConfiguration from './opened-trunking-sip-gateway-configuration.vue';
import TrunkingGeneral from './opened-trunking-sip-gateway-general.vue';

export default {
  name: 'opened-sip-gateway',
  mixins: [openedObjectMixin],
  components: {
    RegisterGeneral,
    TrunkingGeneral,
    TrunkingConfiguration,
  },

  data: () => ({
    namespace: 'routing/gateways',
  }),
  setup: () => ({
    v$: useVuelidate(),
  }),
  validations() {
    if (this.isRegister) {
      return {
        itemInstance: {
          account: { sipAccountValidator, required },
          proxy: { gatewayHostValidator },
          password: { required },
          expires: {
            numeric,
            minValue: minValue(32),
            maxValue: maxValue(3600),
            required,
          },
        },
      };
    }
    return {
      itemInstance: {
        host: { gatewayHostValidator, required },
        proxy: { gatewayHostValidator, required },
        ipacl: {
          $each: helpers.forEach({
            ip: { ipValidator, required },
          }),
        },
      },
    };
  },

  computed: {
    isRegister() {
      return this.$route.path.includes('register');
    },

    tabs() {
      const registerTabs = [
        {
          text: this.$t('objects.general'),
          value: 'register-general',
        },
      ];
      const trunkingTabs = [
        {
          text: this.$t('objects.general'),
          value: 'trunking-general',
        }, {
          text: this.$tc('objects.routing.configuration'),
          value: 'trunking-configuration',
        },
      ];
      return this.isRegister ? registerTabs : trunkingTabs;
    },

    gatewayTitle() {
      return this.isRegister
        ? this.$t('objects.routing.gateways.registerGateway')
        : this.$t('objects.routing.gateways.trunkingGateway');
    },

    path() {
      const baseUrl = '/routing/sip-gateways';
      const url = baseUrl.concat(this.isRegister ? '/register' : '/trunking');
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$tc('objects.routing.gateways.gateways', 2), route: baseUrl },
        {
          name: `${(this.id ? this.pathName : this.$t('objects.new'))} (${this.gatewayTitle})`,
          route: this.id ? `${url}/${this.id}` : `${url}/new`,
        },
      ];
    },
  },

  methods: {
    ...mapActions({
      loadRegisterItem(dispatch, payload) {
        return dispatch(`${this.namespace}/LOAD_REGISTER_ITEM`, payload);
      },
      loadTrunkingItem(dispatch, payload) {
        return dispatch(`${this.namespace}/LOAD_TRUNKING_ITEM`, payload);
      },
    }),

    loadItem() {
      if (this.isRegister) this.loadRegisterItem();
      else this.loadTrunkingItem();
    },
  },
};
</script>
