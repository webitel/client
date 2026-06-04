<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :model-value="itemInstance.name"
        required
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-single-select
        :disabled="disableUserInput || !hasGatewaysReadAccess"
        :label="$t('objects.routing.gateways.gateways', 1)"
        :search-method="loadDropdownOptionsList"
        :v="v.itemInstance.gateway"
        :model-value="itemInstance.gateway"
        required
        @update:model-value="setItemProp({ prop: 'gateway', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.cps')"
        :v="v.itemInstance.cps"
        :model-value="itemInstance.cps"
        required
        @update:model-value="setItemProp({ prop: 'cps', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.limit')"
        :v="v.itemInstance.limit"
        :model-value="itemInstance.limit"
        required
        @update:model-value="setItemProp({ prop: 'limit', value: $event })"
      />
      <wt-single-select
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.cidType')"
        :options="CidTypeList"
        :data-key="null"
        :model-value="itemInstance.parameters.cidType"
        @update:model-value="setItemParameterProp({ prop: 'cidType', value: $event })"
      />
      <wt-single-select
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.ignoreEarlyMedia')"
        :options="EarlyMediaList"
        :data-key="null"
        :model-value="itemInstance.parameters.ignoreEarlyMedia"
        @update:model-value="setItemParameterProp({ prop: 'ignoreEarlyMedia', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
      <wt-multi-select
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.patterns')"
        :model-value="itemInstance.patterns"
        chips-view
        allow-custom-values
        @update:model-value="setItemProp({ prop: 'patterns', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { WtObject } from '@webitel/ui-sdk/enums';
import { mapActions } from 'vuex';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import GatewaysAPI from '../../../../routing/modules/gateways/api/gateways';
import CidTypeList from '../lookups/CidType.lookup';
import EarlyMediaList from '../lookups/EarlyMedia.lookup';

export default {
	name: 'OpenedResourceGeneral',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		const { hasReadAccess: hasGatewaysReadAccess } = useUserAccessControl(
			WtObject.Gateway,
		);
		return {
			disableUserInput,
			hasGatewaysReadAccess,
		};
	},
	data() {
		return {
			CidTypeList,
			EarlyMediaList,
		};
	},
	methods: {
		...mapActions({
			setItemParameterProp(dispatch, payload) {
				return dispatch(
					`${this.namespace}/SET_ITEM_PARAMETERS_PROPERTY`,
					payload,
				);
			},
		}),
		loadDropdownOptionsList(params) {
			return GatewaysAPI.getLookup(params);
		},
	},
};
</script>
