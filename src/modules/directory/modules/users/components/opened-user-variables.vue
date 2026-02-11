<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.directory.users.variables') }}
      </h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addVariable"
      />
    </header>
    <div class="object-input-grid">
      <div class="variables">
        <div
          v-for="(variable, key) in itemInstance.variables"
          :key="key"
          class="value-pair"
        >
          <wt-input-text
            :disabled="disableUserInput"
            :placeholder="$t('objects.directory.users.varKey')"
            :v="v.itemInstance.variables.$each.$response.$data[key].key"
            :model-value="variable.key"
            @update:model-value="setVariableProp({ index: key, prop: 'key', value: $event })"
          />
          <wt-input-text
            :disabled="disableUserInput"
            :placeholder="$t('objects.directory.users.varVal')"
            :v="v.itemInstance.variables.$each.$response.$data[key].value"
            :model-value="variable.value"
            @update:model-value="setVariableProp({ index: key, prop: 'value', value: $event })"
          />
          <wt-icon-action
            v-if="!disableUserInput"
            action="delete"
            class="value-pair__delete-button"
            @click="deleteVariable(key)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
	name: 'OpenedUserVariables',
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
>
.value-pair__delete-button {
  margin-bottom: 20px;
}
</style>
