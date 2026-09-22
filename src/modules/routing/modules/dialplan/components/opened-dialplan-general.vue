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
        :v="v.itemInstance.name"
        :model-value="itemInstance.name"
        required
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-single-select
        :show-clear="false"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="$t('objects.routing.schema', 1)"
        :search-method="hasFlowsReadAccess && loadFlows"
        :v="v.itemInstance.schema"
        :model-value="itemInstance.schema"
        required
        @update:model-value="setItemProp({ prop: 'schema', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.dialplan.pattern')"
        :v="v.itemInstance.pattern"
        :model-value="itemInstance.pattern"
        required
        @update:model-value="setItemProp({ prop: 'pattern', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('objects.routing.dialplan.allowTransfer')"
        :model-value="itemInstance.allowTransfer"
        @update:model-value="setItemProp({ prop: 'allowTransfer', value: $event })"
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
	name: 'OpenedDialplan',
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
		loadFlows(params) {
			return FlowsAPI.getLookup(params);
		},
	},
};
</script>

<style scoped></style>
