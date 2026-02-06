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
        :label="$t('objects.integrations.storage.maxSize')"
        :min="0"
        :v="v.itemInstance.maxSize"
        :model-value="itemInstance.maxSize"
        @update:model-value="setItemProp({ prop: 'maxSize', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.expireDays')"
        :min="0"
        :v="v.itemInstance.expireDays"
        :model-value="itemInstance.expireDays"
        @update:model-value="setItemProp({ prop: 'expireDays', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.priority')"
        :min="0"
        :v="v.itemInstance.priority"
        :model-value="itemInstance.priority"
        @update:model-value="setItemProp({ prop: 'priority', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedStorageGeneral',
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
></style>
