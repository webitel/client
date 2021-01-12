<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.directory.devices.phoneInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
          :value="phone"
          :label="$t('objects.directory.devices.phone')"
          :options="phoneOptions"
          @input="setDevice"
      ></wt-select>
      <wt-input
          :value="ip"
          :v="v.itemInstance.ip"
          :label="$t('objects.directory.devices.ipv4')"
          @input="setItemProp({ prop: 'ip', value: $event })"
      >
        <template slot="validation-text" slot-scope="{ invalid }">
          {{ invalid ? $t('validation.ipValidator') : ''}}
        </template>
      </wt-input>
      <wt-input
          :value="brand"
          :label="$t('objects.directory.devices.vendor')"
          @input="setItemProp({ prop: 'brand', value: $event })"
      ></wt-input>
      <wt-input
          :value="model"
          :label="$t('objects.directory.devices.model')"
          @input="setItemProp({ prop: 'model', value: $event })"
      ></wt-input>
      <wt-input
          :value="mac"
          :v="v.itemInstance.mac"
          :label="$t('objects.directory.devices.mac')"
          @input="setItemProp({ prop: 'mac', value: $event })"
      >
        <template slot="validation-text" slot-scope="{ invalid }">
          {{ invalid ? $t('validation.macValidator') : ''}}
        </template>
      </wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openedTabComponentMixin from '../../../mixins/openedTabComponentMixin';

export default {
  name: 'opened-device-phone-info',
  mixins: [openedTabComponentMixin],
  data() {
    return {
      phoneOptions: [{
          name: 'Cisco IP Phone 7821',
          id: 1,
          brand: 'cisco',
          model: '7821',
        }, {
          name: 'Yealink SIP-T21P E2',
          id: 2,
          brand: 'yealink',
          model: 'T21',
        }],
    };
  },

  computed: {
    ...mapState('directory/devices', {
      phone: (state) => state.itemInstance.phone,
      ip: (state) => state.itemInstance.ip,
      brand: (state) => state.itemInstance.brand,
      model: (state) => state.itemInstance.model,
      mac: (state) => state.itemInstance.mac,
    }),
  },

  methods: {
    ...mapActions('directory/devices', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),

    setDevice(phone) {
      this.setItemProp({ prop: 'phone', value: phone });
      this.setItemProp({ prop: 'brand', value: phone.brand });
      this.setItemProp({ prop: 'model', value: phone.model });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
