<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.directory.devices.phoneInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
        :value="itemInstance.phone"
        :label="$t('objects.directory.devices.phone')"
        :options="phoneOptions"
        :disabled="disableUserInput"
        @input="setDevice"
      ></wt-select>
      <wt-input
        :value="itemInstance.ip"
        :v="v.itemInstance.ip"
        :label="$t('objects.directory.devices.ipv4')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'ip', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.brand"
        :label="$t('objects.directory.devices.vendor')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'brand', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.model"
        :label="$t('objects.directory.devices.model')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'model', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.mac"
        :v="v.itemInstance.mac"
        :label="$t('objects.directory.devices.mac')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'mac', value: $event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-device-phone-info',
  mixins: [openedTabComponentMixin],
  data: () => ({
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
  }),

  methods: {
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
