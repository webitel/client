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
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.lookups.pauseCause.limit')"
        :model-value="itemInstance.limitMin"
        @update:model-value="setItemProp({ prop: 'limitMin', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
      <div class="form-checkbox-wrapper">
        <wt-checkbox
          :disabled="disableUserInput"
          :label="$t('objects.lookups.pauseCause.allowAdmin')"
          :selected="itemInstance.allowAdmin"
          @update:selected="setItemProp({ prop: 'allowAdmin', value: $event })"
        />
        <wt-checkbox
          :disabled="disableUserInput"
          :label="$t('objects.lookups.pauseCause.allowSupervisor')"
          :selected="itemInstance.allowSupervisor"
          @update:selected="setItemProp({ prop: 'allowSupervisor', value: $event })"
        />
        <wt-checkbox
          :disabled="disableUserInput"
          :label="$t('objects.lookups.pauseCause.allowAgent')"
          :selected="itemInstance.allowAgent"
          @update:selected="setItemProp({ prop: 'allowAgent', value: $event })"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedAgentPauseCauseGeneral',
  mixins: [openedTabComponentMixin],
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
.form-checkbox-wrapper .wt-checkbox:not(:last-child) {
  margin-bottom: var(--spacing-sm);
}
</style>
