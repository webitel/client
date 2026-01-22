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
        <wt-tabs :current="currentTab" :tabs="tabs" @change="changeTab" />
        <component :is="currentTab.value" :namespace="namespace" :v="v$" />
        <input hidden type="submit"> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import {
  helpers,
  maxValue,
  minValue,
  numeric,
  required,
  requiredUnless,
} from '@vuelidate/validators';
import { mapActions } from 'vuex';

import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import {
  gatewayHostValidator,
  ipValidator,
  sipAccountValidator,
} from '../../../../../app/utils/validators';
import GatewaysRoutesName from '../router/_internals/GatewaysRouteNames.enum.js';
import RegisterGeneral from './opened-register-sip-gateway-general.vue';
import TrunkingConfiguration from './opened-trunking-sip-gateway-configuration.vue';
import TrunkingGeneral from './opened-trunking-sip-gateway-general.vue';

export default {
  name: 'OpenedSipGateway',
  components: {
    RegisterGeneral,
    TrunkingGeneral,
    TrunkingConfiguration,
  },
  mixins: [openedObjectMixin],
  setup: () => ({
    v$: useVuelidate(),
  }),

  data: () => ({
    namespace: 'routing/gateways',
    routeName: RouteNames.GATEWAYS,
  }),
  validations() {
    if (this.isRegister) {
      return {
        itemInstance: {
          account: {
            sipAccountValidator,
            required,
          },
          proxy: {
            gatewayHostValidator,
            required,
          },
          password: {
            required: requiredUnless(() => !!this.id),
          },
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
        host: {
          gatewayHostValidator,
          required,
        },
        proxy: {
          gatewayHostValidator,
          required,
        },
        ipacl: {
          $each: helpers.forEach({
            ip: {
              ipValidator,
              required,
            },
          }),
        },
      },
    };
  },

  computed: {
    isRegister() {
      return this.$route.query.type === 'reg' || this.itemInstance.register;
    },

    tabs() {
      const registerTabs = [
        {
          text: this.$t('objects.general'),
          value: 'register-general',
          pathName: GatewaysRoutesName.GENERAL,
        },
      ];
      const trunkingTabs = [
        {
          text: this.$t('objects.general'),
          value: 'trunking-general',
          pathName: GatewaysRoutesName.GENERAL,
        }, {
          text: this.$t('objects.routing.configuration'),
          value: 'trunking-configuration',
          pathName: GatewaysRoutesName.CONFIGURATION,
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
      const baseUrl = '/routing/gateways';
      return [
        {
          name: this.$t('objects.routing.routing'),
        },
        {
          name: this.$t('objects.routing.gateways.gateways', 2),
          route: baseUrl,
        },
        {
          name: `${this.id ? this.pathName : this.$t('objects.new')} (${this.gatewayTitle})`,
          route: {
            name: this.currentTab.pathName,
            query: this.$route.query,
          },
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
      if (this.isRegister) return this.loadRegisterItem();
      else return this.loadTrunkingItem();
    },

    changeTab(tab) {
      this.$router.push({ name: tab.pathName, query: this.$route.query });
    },
  },
};
</script>
