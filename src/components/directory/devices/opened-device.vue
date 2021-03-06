<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <wt-headline>
        <template slot="title">
          {{ $tc('objects.directory.devices.devices', 1) }}
          | {{ computeTitle }}
        </template>
        <template slot="actions">
          <wt-button :disabled="computeDisabled" @click="save">
            {{ computePrimaryText || $t('objects.addNew') }}
          </wt-button>
          <wt-button color="secondary" @click="close">
            {{ $t('objects.close') }}
          </wt-button>
        </template>
      </wt-headline>
    </template>

    <template slot="main">
      <div class="main-container">
        <wt-tabs
            v-model="currentTab"
            :tabs="tabs"
        >
        </wt-tabs>
        <component
            :is="$options.name + '-' + currentTab.value"
            :v="$v"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required, requiredUnless } from 'vuelidate/lib/validators';
import { ipValidator, macValidator } from '../../../utils/validators';
import OpenedDevicePhoneInfo from './opened-device-phone-info.vue';
import OpenedDeviceGeneral from './opened-device-general.vue';
import OpenedDevicePermissions from './opened-device-permissions.vue';
import OpenedDeviceHotdeskGeneral from './opened-hotdesk-device-general.vue';
import OpenedDeviceHotdeskHotdesking from './opened-hotdesk-device-hotdesking.vue';
import editComponentMixin from '../../../mixins/editComponentMixin';

export default {
  name: 'opened-device',
  mixins: [editComponentMixin],
  components: {
    OpenedDeviceGeneral,
    OpenedDevicePhoneInfo,
    OpenedDevicePermissions,
    OpenedDeviceHotdeskGeneral,
    OpenedDeviceHotdeskHotdesking,
  },

  data() {
    return {
      currentTab: {
        value: 'general',
      },
    };
  },

  validations: {
    itemInstance: {
      name: { required },
      password: { required: requiredUnless('id') },
      account: { required },
      ip: { ipValidator },
      mac: { macValidator },
    },
  },

  created() {
    this.setInitialTab();
  },

  mounted() {
    this.setId(this.$route.params.id);
    this.loadItem();
  },

  computed: {
    ...mapState('directory/devices', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
    }),

    isHotdesk() {
      return this.$route.path.includes('hotdesk');
    },

    tabs() {
      const defaultTabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$t('objects.directory.devices.phoneInfo'),
        value: 'phoneInfo',
      }];

      const hotdeskTabs = [{
        text: this.$t('objects.general'),
        value: 'hotdesk-general',
      }, {
        text: this.$t('objects.directory.devices.hotdesk'),
        value: 'hotdesk-hotdesking',
      }, {
        text: this.$t('objects.directory.devices.phoneInfo'),
        value: 'phoneInfo',
      }];

      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
      };
      if (this.isHotdesk) return hotdeskTabs;

      if (this.id) defaultTabs.push(permissions);
      return defaultTabs;
    },
  },

  methods: {
    ...mapActions('directory/devices', {
      setId: 'SET_ITEM_ID',
      loadSingleItem: 'LOAD_SINGLE_ITEM',
      loadHotdeskItem: 'LOAD_HOTDESK_ITEM',
      addItem: 'ADD_ITEM',
      updateItem: 'UPDATE_ITEM',
    }),

    setInitialTab() {
      this.currentTab.value = this.isHotdesk ? 'hotdesk-general' : 'general';
    },

    loadItem() {
      if (this.isHotdesk) {
        this.loadHotdeskItem();
      } else {
        this.loadSingleItem();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
