<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.directory.devices.devices', 2) }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
        :value="itemInstance.device"
        :options="itemInstance.devices"
        :label="$t('objects.directory.users.defaultDevice')"
        :disabled="disableUserInput"
        track-by="id"
        required
        @input="setItemProp({ prop: 'device', value: $event })"
        @reset="setItemProp({ prop: 'device', value: {} })"
      ></wt-select>
      <div>
        <wt-select
          :value="itemInstance.devices"
          :label="$tc('objects.directory.devices.devices', 2)"
          :search-method="loadDropdownOptionsList"
          :close-on-select="false"
          :disabled="disableUserInput"
          multiple
          @input="setItemProp({ prop: 'devices', value: $event })"
        ></wt-select>

        <div class="hint-link__wrap">
          <span>{{ $t('objects.directory.users.deviceNotFound') }} </span>
          <router-link class="hint-link__link" to="/directory/devices/new">
            {{ $t('objects.directory.users.createNewDevice') }}
          </router-link>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import DevicesAPI from '../../devices/api/devices';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-user-devices',
  mixins: [openedTabComponentMixin],
  methods: {
    async loadDropdownOptionsList(params) {
      const fields = ['id', 'name', 'hotdesk'];
      const response = await DevicesAPI.getLookup({ ...params, fields });
      response.items = response.items.filter((item) => !item.hotdesk);
      return response;
    },
  },
};
</script>

<style lang="scss" scoped>
.hint-link__wrap {
  @extend %typo-body-md;
  margin-top: 8px;
}

.hint-link__link {
  @extend %typo-strong-md;
  text-decoration: underline;
}
</style>
