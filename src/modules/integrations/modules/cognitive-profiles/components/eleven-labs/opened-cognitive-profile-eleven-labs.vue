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
      <wt-select
        :clearable="false"
        :disabled="true || disableUserInput"
        :label="$t('objects.provider')"
        :v="v.itemInstance.provider"
        :value="itemInstance.provider"
        required
        @input="setItemProp({ prop: 'provider', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="true || disableUserInput"
        :label="$t('objects.service')"
        :options="CognitiveProfileServices"
        :v="v.itemInstance.service"
        :value="itemInstance.service"
        required
        track-by="value"
        @input="setItemProp({ prop: 'service', value: $event })"
      />
      <div />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.key')"
        :v="v.itemInstance.properties.key"
        :model-value="itemInstance.properties.key"
        :label-props="{ hint: $t('objects.directory.passwordInfo'), hintPosition: 'right' }"
        required
        @update:model-value="setItemProp({ path: 'properties.key', value: $event })"
      />
      <div />
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
import { useUserAccessControl } from '../../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CognitiveProfileServices from '../../lookups/CognitiveProfileServices.lookup';

export default {
	name: 'OpenedCognitiveProfileElevenLabs',
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
		CognitiveProfileServices,
	}),
};
</script>

<style scoped></style>
