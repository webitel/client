<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.triggers.type')"
        :v="v.itemInstance.type"
        :value="itemInstance.type"
        required
        track-by="value"
        @input="setItemProp({ prop: 'type', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.schema"
        :v="v.itemInstance.schema"
        :label="$tc('objects.integrations.triggers.schema')"
        :clearable="false"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'schema', value: $event })"
      ></wt-select>
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-triggers-general',
  mixins: [openedTabComponentMixin],
};
</script>

<style scoped>

</style>
