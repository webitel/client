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
import { required, requiredUnless } from '@vuelidate/validators';
import { mapActions } from 'vuex';

import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import { ipValidator, macValidator } from '../../../../../app/utils/validators';
import DevicesRouteNames from '../router/_internals/DevicesRouteNames.enum.js';
import General from './opened-device-general.vue';
import PhoneInfo from './opened-device-phone-info.vue';
import HotdeskGeneral from './opened-hotdesk-device-general.vue';
import HotdeskHotdesking from './opened-hotdesk-device-hotdesking.vue';

const hotDeskNameValidator = (array) =>
  !array.some((hotdesk) => !/\w+/.test(hotdesk.name || hotdesk.text));

export default {
  name: 'OpenedDevice',
  components: {
    General,
    PhoneInfo,
    HotdeskGeneral,
    HotdeskHotdesking,
  },
  mixins: [openedObjectMixin],
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'directory/devices',
    permissionsTabPathName: `${DevicesRouteNames.PERMISSIONS}-card`,
    routeName: RouteNames.DEVICES,
  }),
  validations() {
    let itemInstance = {
      name: { required },
      password: {
        required: requiredUnless('id'),
      },
      account: { required },
      ip: { ipValidator },
      mac: { macValidator },
    };
    if (this.itemInstance.hotdesk) {
      itemInstance = {
        ...itemInstance,
        hotdesks: {
          hotDeskNameValidator,
        },
      };
    }
    return { itemInstance };
  },

  computed: {
    isHotdesk() {
      return this.$route.query.type === 'hotdesk' || this.itemInstance.hotdesk;
    },

    tabs() {
      const defaultTabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
          pathName: DevicesRouteNames.GENERAL,
        }, {
          text: this.$t('objects.directory.devices.phoneInfo'),
          value: 'phone-info',
          pathName: DevicesRouteNames.PHONE_INFO,
        },
      ];

      const hotdeskTabs = [
        {
          text: this.$t('objects.general'),
          value: 'hotdesk-general',
          pathName: DevicesRouteNames.GENERAL,
        }, {
          text: this.$t('objects.directory.devices.hotdesk'),
          value: 'hotdesk-hotdesking',
          pathName: DevicesRouteNames.HOTDESKING,
        }, {
          text: this.$t('objects.directory.devices.phoneInfo'),
          value: 'phone-info',
          pathName: DevicesRouteNames.PHONE_INFO,
        },
      ];
      if (this.isHotdesk) return hotdeskTabs;

      if (this.id) defaultTabs.push(this.permissionsTab);
      return defaultTabs;
    },

    path() {
      const baseUrl = '/directory/devices';
      return [
        {
          name: this.$t('objects.directory.directory'),
        },
        {
          name: this.$t('objects.directory.devices.devices', 2),
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

  methods: {
    ...mapActions({
      loadTypedItem(dispatch, payload) {
        return dispatch(`${this.namespace}/LOAD_ITEM`, payload);
      },
    }),
    async loadPageData() {
      if (!this.new) await this.setId(this.$route.params.id);
      return this.loadItem();
    },
    loadItem() {
      return this.loadTypedItem(this.isHotdesk);
    },
    close() {
      this.$router.push({ name: RouteNames.DEVICES });
    },
  },
};
</script>

<style lang="scss" scoped></style>
