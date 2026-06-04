<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.directory.devices.devices', 2) }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-single-select
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.defaultDevice')"
        :options="itemInstance.devices"
        :model-value="itemInstance.device"
        required
        data-key="id"
        @update:model-value="setItemProp({ prop: 'device', value: $event })"
        @reset="setItemProp({ prop: 'device', value: {} })"
      />
      <div>
        <wt-multi-select
          :disabled="disableUserInput"
          :label="$t('objects.directory.devices.devices', 2)"
          :search-method="loadDropdownOptionsList"
          :model-value="itemInstance.devices"
          @update:model-value="setItemProp({ prop: 'devices', value: $event })"
        />
        <div class="hint-link__wrap typo-body-2">
          <span>{{ $t('objects.directory.users.deviceNotFound') }} </span>
          <adm-item-link
            id="new"
            class="hint-link__link typo-subtitle-2"
            :route-name="RouteNames.DEVICES"
          >
            {{ $t('objects.directory.users.createNewDevice') }}
          </adm-item-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import ItemLinkMixin from '../../../../../app/mixins/baseMixins/baseTableMixin/itemLinkMixin.js';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import DevicesAPI from '../../devices/api/devices';

export default {
	name: 'OpenedUserDevices',
	mixins: [
		openedTabComponentMixin,
		ItemLinkMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		return {
			disableUserInput,
		};
	},
	methods: {
		async loadDropdownOptionsList(params) {
			const fields = [
				'id',
				'name',
				'hotdesk',
			];
			const response = await DevicesAPI.getLookup({
				...params,
				fields,
			});
			response.items = response.items.filter((item) => !item.hotdesk);
			return response;
		},
	},
};
</script>

<style
  lang="scss"
  scoped
>
@use '@webitel/ui-sdk/src/css/main' as *;

.hint-link__wrap {
  margin-top: 8px;
}

.hint-link__link {
  display: inline-block;
  text-decoration: underline;
  color: var(--info-color);
}
</style>
