<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :model-value="itemInstance.name"
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.proxy')"
        :v="v.itemInstance.proxy"
        :model-value="itemInstance.proxy"
        required
        @update:model-value="setItemProp({ prop: 'proxy', value: $event })"
      />
      <wt-single-select
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="$t('objects.routing.schema')"
        :search-method="hasFlowsReadAccess && loadDropdownOptionsList"
        :model-value="itemInstance.schema"
        @update:model-value="setItemProp({ prop: 'schema', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.host')"
        :v="v.itemInstance.host"
        :model-value="itemInstance.host"
        required
        @update:model-value="setItemProp({ prop: 'host', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.usage"
        @update:model-value="setItemProp({ prop: 'usage', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { FlowsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
export default {
	name: 'OpenedTrunkingSipGatewayGeneral',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
			WtObject.Flow,
		);
		return {
			disableUserInput,
			hasFlowsReadAccess,
		};
	},
	methods: {
		loadDropdownOptionsList(params) {
			return FlowsAPI.getLookup(params);
		},
	},
};
</script>
