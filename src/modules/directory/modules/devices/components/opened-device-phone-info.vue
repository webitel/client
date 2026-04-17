<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.directory.devices.phoneInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.directory.devices.ipv4')"
        :v="v.itemInstance.ip"
        :model-value="itemInstance.ip"
        @update:model-value="setItemProp({ prop: 'ip', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.directory.devices.vendor')"
        :model-value="itemInstance.brand"
        @update:model-value="setItemProp({ prop: 'brand', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.directory.devices.model')"
        :model-value="itemInstance.model"
        @update:model-value="setItemProp({ prop: 'model', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.directory.devices.mac')"
        :v="v.itemInstance.mac"
        :model-value="itemInstance.mac"
        @update:model-value="setItemProp({ prop: 'mac', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
	name: 'OpenedDevicePhoneInfo',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		return {
			disableUserInput,
		};
	},
};
</script>

<style
  lang="scss"
  scoped
></style>
