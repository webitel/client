<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.directory.devices.devices', 2) }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-select
        :disabled="disableUserInput"
        :label="t('objects.directory.users.defaultDevice')"
        :options="itemInstance.devices"
        :value="itemInstance.device"
        required
        track-by="id"
        @input="setItemProp({ path: 'device', value: $event })"
        @reset="setItemProp({ path: 'device', value: {} })"
      />
      <div>
        <wt-select
          :close-on-select="false"
          :disabled="disableUserInput"
          :label="t('objects.directory.devices.devices', 2)"
          :search-method="loadDropdownOptionsList"
          :value="itemInstance.devices"
          multiple
          @input="setItemProp({ path: 'devices', value: $event })"
        />
        <div class="hint-link__wrap">
          <span>{{ t('objects.directory.users.deviceNotFound') }} </span>
          <adm-item-link
              class="hint-link__link"
              id="new"
              :route-name="RouteNames.DEVICES"
          >
            {{ t('objects.directory.users.createNewDevice') }}
          </adm-item-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCardStore } from '@webitel/ui-sdk/src/store/new/index.js';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useAccessControl } from '@webitel/ui-sdk/src/composables/useAccessControl/useAccessControl.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import DevicesAPI from '../../devices/api/devices.js';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
  v: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const { t } = useI18n();

const { disableUserInput } = useAccessControl();

const { itemInstance, setItemProp } = useCardStore(props.namespace);

const loadDropdownOptionsList = async (params) => {
  const fields = ['id', 'name', 'hotdesk'];
  const response = await DevicesAPI.getLookup({
    ...params,
    fields,
  });
  response.items = response.items.filter((item) => !item.hotdesk);
  return response;
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.hint-link__wrap {
  @extend %typo-body-2;
  margin-top: 8px;
}

.hint-link__link {
  @extend %typo-subtitle-2;
  display: inline-block;
  text-decoration: underline;
  color: var(--info-color);
}
</style>
