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
import editComponentMixin from '../../../mixins/editComponentMixin';

export default {
  name: 'opened-device',
  mixins: [editComponentMixin],
  components: {
    OpenedDeviceGeneral,
    OpenedDevicePhoneInfo,
    OpenedDevicePermissions,
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
      name: {
        required,
      },
      password: {
        required: requiredUnless('id'),
      },
      account: {
        required,
      },
      ip: {
        ipValidator,
      },
      mac: {
        macValidator,
      },
    },
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

    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$t('objects.directory.devices.phoneInfo'),
        value: 'phoneInfo',
      }];

      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
      };

      if (this.id) tabs.push(permissions);
      return tabs;
    },
  },

  methods: {
    ...mapActions('directory/devices', {
      setId: 'SET_ITEM_ID',
      loadItem: 'LOAD_SINGLE_ITEM',
      addItem: 'ADD_ITEM',
      updateItem: 'UPDATE_ITEM',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
