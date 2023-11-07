<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.maxSize')"
        :min-value="0"
        :v="v.itemInstance.maxSize"
        :value="itemInstance.maxSize"
        type="number"
        @input="setItemProp({ prop: 'maxSize', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.expireDays')"
        :min-value="0"
        :v="v.itemInstance.expireDays"
        :value="itemInstance.expireDays"
        type="number"
        @input="setItemProp({ prop: 'expireDays', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.priority')"
        :min-value="0"
        :v="v.itemInstance.priority"
        :value="itemInstance.priority"
        type="number"
        @input="setItemProp({ prop: 'priority', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedStorageGeneral',
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>

</style>
