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
        :show-clear="false"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="$t('objects.routing.flow.flow', 1)"
        :search-method="hasFlowsReadAccess ? loadFlows : undefined"
        :v="v.itemInstance.schema"
        :model-value="itemInstance.schema"
        required
        @update:model-value="setItemProp({ prop: 'schema', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../flow/api/flow';

export default {
	name: 'OpenedChatplan',
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
