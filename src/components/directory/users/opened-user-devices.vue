<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.directory.devices.devices', 2) }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
          :value="device"
          :options="devices"
          :label="$t('objects.directory.users.defaultDevice')"
          :disabled="disableUserInput"
          track-by="id"
          required
          @input="setItemProp({ prop: 'device', value: $event })"
          @reset="setItemProp({ prop: 'device', value: {} })"
      ></wt-select>
      <div>
        <wt-select
            :value="devices"
            :label="$tc('objects.directory.devices.devices', 2)"
            :search="loadDropdownOptionsList"
            :close-on-select="false"
            :internal-search="false"
            :disabled="disableUserInput"
            track-by="id"
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
import { mapState, mapActions } from 'vuex';
import { getDeviceList } from '../../../api/directory/devices/devices';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-user-devices',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('directory/users', {
      devices: (state) => state.itemInstance.devices,
      device: (state) => state.itemInstance.device,
    }),
  },

  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getDeviceList(1, 10, search);
      if (response.list) {
        return response.list.filter((item) => !item.hotdesk).map((item) => ({
          name: item.name,
          id: item.id,
        }));
      }
      return [];
    },

    ...mapActions('directory/users', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),
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
