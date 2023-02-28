<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :primary-action="save"
        :primary-text="saveText"
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
        >
        </wt-tabs>
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
import { mapActions } from 'vuex';
import { required, requiredUnless } from '@vuelidate/validators';
import { ipValidator, macValidator } from '../../../../../app/utils/validators';
import PhoneInfo from './opened-device-phone-info.vue';
import General from './opened-device-general.vue';
import HotdeskGeneral from './opened-hotdesk-device-general.vue';
import HotdeskHotdesking from './opened-hotdesk-device-hotdesking.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

const hotDeskNameValidator = (array) => !array.some((hotdesk) => !/\w+/.test(hotdesk.name || hotdesk.text));

export default {
  name: 'opened-device',
  mixins: [openedObjectMixin],
  components: {
    General,
    PhoneInfo,
    HotdeskGeneral,
    HotdeskHotdesking,
  },
  data: () => ({
    namespace: 'directory/devices',
  }),
  setup: () => ({
    v$: useVuelidate(),
  }),
  validations() {
    let itemInstance = {
      name: { required },
      password: { required: requiredUnless('id') },
      account: { required },
      ip: { ipValidator },
      mac: { macValidator },
    };
    if (this.itemInstance.hotdesk) {
      itemInstance = {
        ...itemInstance,
        hotdesks: { hotDeskNameValidator },
      };
    }
    return { itemInstance };
  },

  computed: {
    isHotdesk() {
      return this.$route.path.includes('hotdesk');
    },

    tabs() {
      const defaultTabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$t('objects.directory.devices.phoneInfo'),
        value: 'phone-info',
      }];

      const hotdeskTabs = [{
        text: this.$t('objects.general'),
        value: 'hotdesk-general',
      }, {
        text: this.$t('objects.directory.devices.hotdesk'),
        value: 'hotdesk-hotdesking',
      }, {
        text: this.$t('objects.directory.devices.phoneInfo'),
        value: 'phone-info',
      }];
      if (this.isHotdesk) return hotdeskTabs;

      if (this.id) defaultTabs.push(this.permissionsTab);
      return defaultTabs;
    },

    path() {
      const baseUrl = '/directory/devices';
      const url = baseUrl + this.isHotdesk ? '/hotdesk' : '';
      return [
        { name: this.$t('objects.directory.directory') },
        { name: this.$tc('objects.directory.devices.devices', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${url}/${this.id}` : `${baseUrl}/new`,
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
    setInitialTab() {
      this.currentTab.value = this.isHotdesk ? 'hotdesk-general' : 'general';
    },
    loadItem() {
      return this.loadTypedItem(this.isHotdesk);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
