<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.maxSize"
        :label="$t('objects.integrations.storage.maxSize')"
        :disabled="disableUserInput"
        type="number"
        :min-value="0"
        @input="setItemProp({ prop: 'maxSize', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.expireDays"
        :label="$t('objects.integrations.storage.expireDays')"
        :disabled="disableUserInput"
        type="number"
        :min-value="0"
        @input="setItemProp({ prop: 'expireDays', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.priority"
        :label="$t('objects.integrations.storage.priority')"
        :disabled="disableUserInput"
        type="number"
        :min-value="0"
        @input="setItemProp({ prop: 'priority', value: $event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-storage-general',
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>

</style>
