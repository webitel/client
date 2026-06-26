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
        :disabled="true || disableUserInput"
        :label="$t('objects.provider')"
        :v="v.itemInstance.provider"
        :model-value="itemInstance.provider"
        required
        @update:model-value="setItemProp({ prop: 'provider', value: $event })"
      />
      <wt-single-select
        :show-clear="false"
        :disabled="disableUserInput"
        :label="$t('objects.service')"
        :options="CognitiveProfileServices"
        :v="v.itemInstance.service"
        :model-value="itemInstance.service"
        required
        data-key="value"
        @update:model-value="setItemProp({ prop: 'service', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.key')"
        :label-props="{ hint: $t('objects.directory.passwordInfo'), hintPosition: 'right' }"
        :v="v.itemInstance.properties.key"
        :model-value="itemInstance.properties.key"
        required
        @update:model-value="setItemPropertiesProp({ prop: 'key', value: $event })"
      />
      <wt-single-select
        :show-clear="false"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.cognitiveProfiles.properties.locale')"
        :options="MicrosoftLanguageOptions"
        :data-key="null"
        :v="v.itemInstance.properties.locale"
        :model-value="itemInstance.properties.locale"
        required
        @update:model-value="setItemPropertiesProp({ prop: 'locale', value: $event })"
      />
      <wt-single-select
        :show-clear="false"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.cognitiveProfiles.properties.region')"
        :options="MicrosoftRegion"
        :v="v.itemInstance.properties.region"
        :model-value="itemInstance.properties.region"
        required
        @update:model-value="setItemPropertiesProp({ prop: 'region', value: $event })"
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
import { mapActions } from 'vuex';
import { MicrosoftLanguage, MicrosoftRegion } from 'webitel-sdk/enums';

import { useUserAccessControl } from '../../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CognitiveProfileServices from '../../lookups/CognitiveProfileServices.lookup';

export default {
	name: 'OpenedCognitiveProfileMicrosoft',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		return {
			disableUserInput,
		};
	},
	data: () => ({
		MicrosoftRegion,
		CognitiveProfileServices,
		MicrosoftLanguageOptions: Object.values(MicrosoftLanguage),
	}),
	methods: {
		...mapActions({
			setItemPropertiesProp(dispatch, payload) {
				return dispatch(`${this.namespace}/SET_ITEM_PROPERTIES_PROP`, payload);
			},
		}),
	},
};
</script>

<style scoped></style>
